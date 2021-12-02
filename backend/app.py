import firebase_admin
import pyrebase
import json
from firebase_admin import credentials, auth, firestore
from flask import Flask, request, jsonify
from functools import wraps
import logging
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

cred = credentials.Certificate('fbAdminConfig.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('fbconfig.json')))
db = firestore.client()
users = db.collection('users')

def add_swipes_helper(user_id, swipes, swiped=1):
    val = 1
    if not swiped:
        val = -0.5
    for swipe in swipes:
        doc_ref = users.document(user_id).collection('swipes').document(swipe)
        data = doc_ref.get().to_dict()
        if data is None:
            doc_ref.set({
                "weight": val, 
                "seen": 1
            })
        else:
            doc_ref.update({
                "weight": firestore.Increment(val),
                "seen": firestore.Increment(1)
            })

def get_match(user_id):
    swipes_data = []
    for user in users.stream():
        swipes = users.document(user.id).collection('swipes')
        for swipe in swipes.stream():
            swipes_data.append([user.id, swipe.id, swipe.to_dict()["weight"]])
    swipes_df = pd.DataFrame(swipes_data, columns=["userId", "item", "weight"])

    final = pd.pivot_table(swipes_df, values="weight", index="userId", columns="item")
    final = final.fillna(0)

    cosine = cosine_similarity(final)
    np.fill_diagonal(cosine, 0)

    similarities = pd.DataFrame(cosine, index=final.index)
    similarities.columns = final.index
    similarities = np.abs(similarities)

    id = similarities[user_id].sort_values(ascending=False).index[0]
    user_data = users.document(id).get().to_dict()

    # print(final.loc[user_id].sort_values())
    # print(final.loc[id].sort_values())

    return user_data["firstName"], user_data["lastName"]
    

@app.route('/addSwipes', methods=['POST'])
def add_swipes():
    try:
        swiped = request.json['swiped']
        not_swiped = request.json['notSwiped']
        user_id = request.json['id']

        add_swipes_helper(user_id, swiped, 1)
        add_swipes_helper(user_id, not_swiped, 0)
        first_name, last_name = get_match(user_id)

        return {"firstName": first_name, "lastName": last_name}, 200
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
    app.run(host='192.168.1.32', port=5000, debug=True)
    # app.run(debug=True)