from flask import Flask
from flask import render_template
from flask import request
import json
app = Flask(__name__)

try:
    with open("data.txt", "r") as f:
        week = json.load(f)
except:
    week = {}
    for d in range(7):
        for s in range(48):
            week["#D" + str(d) + f'{s:02}'] = "Free"
    print(week)

    a_file = open("data.txt", "w")

    print(json.dumps(week))
    a_file.write(json.dumps(week))
    a_file.close()

@app.route("/home")
@app.route("/")
def hello():
    print("Hello")
    return render_template('home.html', data=week)

@app.route("/press/", methods=["POST"])
def press(methods=["POST"]):
    cell = request.data.decode("utf-8")
    week[cell[8: 13]] = cell[13:-2]

    a_file = open("data.txt", "w")

    a_file.write(json.dumps(week))
    a_file.close()    

    return {"":""}


if __name__ == '__main__':
    app.run(debug=True)