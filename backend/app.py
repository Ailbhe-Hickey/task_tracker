# Main file that runs the Flask backend


from flask import Flask
from flask_cors import CORS
from models import db
from routes import task_routes

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'

# Initialize SQLAlchemy with the app
db.init_app(app)

# Register blueprint
app.register_blueprint(task_routes)

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)



