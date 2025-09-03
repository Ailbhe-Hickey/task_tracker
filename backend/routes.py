from flask import Blueprint, jsonify, request
from models import Task, db

task_routes = Blueprint("tasks", __name__)

# Get all tasks
@task_routes.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

# Add new task
@task_routes.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    if not data or "title" not in data:
        return {"error": "Title is required"}, 400

    new_task = Task(title=data["title"], completed=False)
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201


# Update task
@task_routes.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json
    task.title = data.get("title", task.title)
    task.completed = data.get("completed", task.completed)
    db.session.commit()
    return jsonify(task.to_dict())

# Delete task
@task_routes.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return "", 204
