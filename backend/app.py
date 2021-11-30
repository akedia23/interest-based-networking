import firebase_admin
import pyrebase
import json
from firebase_admin import credentials, auth, firestore
from flask import Flask, request, jsonify
from functools import wraps
import logging

app = Flask(__name__)

cred = credentials.Certificate('fbAdminConfig.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))
db = firestore.client()
users = db.collection('users')

@app.route('/addSwipes', methods=['POST'])
def add_swipes():
    try:
        swiped = request.json['swiped']
        print(swiped)
        notSwiped = request.json['notSwiped']
        print(notSwiped)
        # swipes = users.document(request.json['id']).collection('swipes').document('item1').get().to_dict()
        for swipe in swiped:
            doc_ref = users.document(request.json['id']).collection('swipes').document(swipe)
            val = doc_ref.get().to_dict()
            if val is None:
                doc_ref.set({
                    "weight": 1, 
                    "seen": 1
                })
            else:
                doc_ref.update({
                    "weight": firestore.Increment(1),
                    "seen": firestore.Increment(1)
                })
        for swipe in notSwiped:
            doc_ref = users.document(request.json['id']).collection('swipes').document(swipe)
            val = doc_ref.get().to_dict()
            if val is None:
                doc_ref.set({
                    "weight": -0.5, 
                    "seen": 1
                })
            else:
                doc_ref.update({
                    "weight": firestore.Increment(-0.5),
                    "seen": firestore.Increment(1)
                })

        return {"message": "succeeded"}, 200
    except Exception as e:
        return f"An error occurred: {e}"
        # print(e)
    # users.document(request.json['id']).collection('swipes').update(request.json['swipes'])
    # users.document('1').set({"item2": 3})

def check_token(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get('authorization'):
            return {'message': 'No token provided'},400
        try:
            user = auth.verify_id_token(request.headers['authorization'])
            request.user = user
        except:
            return {'message':'Invalid token provided.'},400
        return f(*args, **kwargs)
    return wrap

@app.route('/test')
@check_token
def test():
    return {'message':'yo'},200

#Api route to sign up a new user
@app.route('/api/signup')
def signup():
    email = request.form.get('email')
    password = request.form.get('password')
    print(email)
    print(password)
    if email is None or password is None:
        return {'message': 'Error missing email or password'},400
    try:
        user = auth.create_user(
               email=email,
               password=password
        )
        return {'message': f'Successfully created user {user.uid}'},200
    except:
        logging.exception("message")
        return {'message': 'Error creating user'},400
#Api route to get a new token for a valid user
@app.route('/api/token')
def token():
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user['idToken']
        return {'token': jwt},200
    except:
        logging.exception("message")
        return {'message': 'There was an error logging in'},400

@app.route("/")
def hello():
    return "Hello World!"


if __name__ == "__main__":
    app.run(host='192.168.1.250', port=5000, debug=True)