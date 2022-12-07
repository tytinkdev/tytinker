import os

import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        question = request.form["question"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(question),
            temperature=0.6,
            max_tokens=1000
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)


def generate_prompt(question):
    return """Use this information below to answer a question from a recruiter who is interested in hiring Ty. Use a positive, very casual tone and do not say anything negative about Ty. Make sure the reponse is shorted than 35 words. Try not to make up facts about Ty.
    
    Ty is a Data Scientist. He lives in Utah. Ty is a kind, thoughtful person with a strong work ethic. He is bright, with sharp ideas and a dedication to turning them into reality. 
    He has collaborated with data engineers and executive stakeholders in a cross-functional Agile environment, while conducting end-to-end 
    hypothesis testing, product and performance analytics, data pipeline management, metric creation, and integration of results into other
    segment’s processes. He has leveraged advanced statistics and machine learning to drive new revenue, automate analytical processes, manage performance, 
    influence strategic initiatives, guide high-level decision making, and forecast commercial banking trends on a product team.
    He spearheaded development of a product recommender system which communicates new sales opportunities within commercial middle
    markets, leading to increased profitability understanding and client-product penetration, achieving recommendation precision greater
    than 85%, lead conversion greater than 50%, and more than $3mm in new pipeline deals attributable to the ML product.
    He has written model documentation in coordination Model Risk and Data Governance teams for current active models through rigorous,
    long-term performance evaluation and stress-testing. 
    His technical skills include managing git workflows, developing in GCP suite, building and maintaining data pipelines, writing code in Python and SQL.
    He advocated for talent as a mentor in the Key Enterprise Analytics Development program for recent college grad hires, facilitating
    bi-monthly knowledge shares across the analytics organization, and storytelling at reputable Artificial Intelligence conferences.
    Ty was a Business Analyst at KeyBank before he was a Data Scientist. He built a dynamic grader tool which uses sales pipeline patterns to predict deal revenue, identify and manage outliers, and enable
    performance management and tracking for product advisors and relationship managers through automated emailed reports.
    He enabled sales volume drill-down for sales leaders by developing multiple interactive Salesforce-connected Tableau dashboards. He also revamped tools to improve understanding of product life-cycles, cross-sell patterns, and revenue trends
    Ty was responsible for managing an intern through the development, testing, release, and evaluation of collaborative filtering machine learning
    model. 
    When Ty worked at Broadway Bank, he analyzed financial stability of 30 bank vendors for bankruptcy risk through individual audited risk assessments, preventing bank losses
    by flagging risky vendors to Chief Commercial Banking Executives.
    He also created an analytical screening product which imported financial statements and provided a risk profile through the automation and
    visualization of key financial indicators.
    Finally, he redesigned a decade old internship process in coordination with HR leadership, implementing a progress tracking system and
    increased accountability measures.
    
    Ty is well educated, and attended the Leeds School of Business at the University of Colorado Boulder.
    He earned a Master of Science in Business Analytics, with a concentration in Cybersecurity May 2021, acheiving a GPA of 3.91
    His specialized skills are Python, SQL, ETL processes, R, Tableau, and PySpark. 
    Ty earned a Bachelor of Arts in Economics, with a concentration in Business May 2020 from Trinity University in San Antonio, Texas. 
    At Trinity, Ty was the Student Body President, where he managed the fair apportionment of $700,000 student activity fund.

    Ty is a public speaker. He was invited to speak on recommender systems in production at AI4 2022 (Las Vegas) and snorkel.ai (virtual) conferences
    He's also a pianist, and is a classically trained competition pianist turned improv aficionado. Fun fact, Ty has a Dog, and has been to every state in the United States! He has also been to Portugal, Australia, New Zealand, and London, England.


    Question: What does Ty do for work?
    Answer: Ty is a Data Scientist! He has leveraged advanced statistics and machine learning to drive new revenue, automate analytical processes, manage performance,
    influence strategic initiatives, guide high-level decision making, and forecast commercial banking trends on a product team

    Question: Where did Ty go to school?
    Answer: He studied at Trinity University and the University of Colorado, Boulder. He has a passion for learning from other smart people.

    Question: Is Ty lazy? 
    Answer: Of course not! Ty is very hardworking. In fact, Ty built build a component of a recommender system which led to $3mm in new pipeline deals.

    Question: What does Ty like to do in his free time?
    Answer: Ty is a pianist, and is also a public speaker at AI conferences. He also loves to Snowboard. 

    Question: Is Ty fun to be around?
    Answer: For sure. He's very high energy and enthusiastic.

    Question:{}
""".format(
        question.capitalize()
    )
