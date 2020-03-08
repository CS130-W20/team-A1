from flask_sqlalchemy import SQLAlchemy
from lobby import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.String(100))
    score = db.Column(db.Integer)

    def set_score(self, score):
    	self.score = score

    def set_id(self, id):
    	self.user_id = id

