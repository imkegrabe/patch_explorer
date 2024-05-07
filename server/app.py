import logging
from datetime import datetime


import uvicorn
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi_socketio import SocketManager

from nnsight.pydantics import RequestModel


# Attache to gunicorn logger
logger = logging.getLogger("gunicorn.error")

# Init FastAPI app
app = FastAPI()
# Add middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate")
async def request(
    request: RequestModel, api_key=Depends(api_key_auth)
) -> ResponseModel:
    """Endpoint to submit request.

    Args:
        request (RequestModel): _description_

    Returns:
        ResponseModel: _description_
    """
    try:
        # Set the id and time received of request.
        request.received = datetime.now()
        request.id = str(ObjectId())

        # Send to request workers waiting to process requests on the "request" queue.
        # Forget as we don't care about the response.
        process_request.apply_async([request], queue="request").forget()

        # Create response object.
        # Log and save to data backend.
        response = (
            ResponseModel(
                id=request.id,
                received=request.received,
                session_id=request.session_id,
                status=ResponseModel.JobStatus.RECEIVED,
                description="Your job has been received and is waiting approval.",
            )
            .log(logger)
            .save(celery_app.backend._get_connection())


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001, workers=1)
