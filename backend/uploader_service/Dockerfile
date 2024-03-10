FROM python:alpine3.13

WORKDIR /app

COPY fastfiles ./fastfiles

COPY requirements.txt ./

COPY app.py ./

COPY home.html ./

RUN pip install -r requirements.txt

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]

EXPOSE 8080