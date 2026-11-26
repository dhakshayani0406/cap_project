import os
import sys
import uvicorn

# Ensure the backend directory is in the Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(current_dir, "backend") if os.path.exists(os.path.join(current_dir, "backend")) else current_dir

if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

if __name__ == "__main__":
    print("=" * 70)
    print("🚀 Starting Credit-Risk Scorecard ML Backend (FastAPI)")
    print("   Benchmark: Home Credit Default Risk (KL Capstone DSCI-14)")
    print("   API Host:  http://localhost:5000")
    print("   Swagger:   http://localhost:5000/docs")
    print("=" * 70)
    uvicorn.run("app.main:app", host="127.0.0.1", port=5000, reload=True)
