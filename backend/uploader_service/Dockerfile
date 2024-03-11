FROM python:alpine3.13

WORKDIR /app

COPY fastfiles ./fastfiles

COPY requirements.txt ./

COPY app.py ./

COPY home.html ./

RUN pip install -r requirements.txt

CMD ["python3", "app.py"]

EXPOSE 8088