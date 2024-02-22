from fastapi import FastAPI
import json 

app = FastAPI()

@app.post("/receive_data")
async def receive_data(data):
    # Process received data
    employee_dict = json.loads(data) 
    print("Converted to Python", type(employee_dict)) 
    print(employee_dict) 
    print(f"Received data: {employee_dict}")
    return {"message": "Data received successfully"}


# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("metaServer:app", host="0.0.0.0", port = 8010)