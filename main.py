import logging
from fastapi import FastAPI
import inngest.fast_api
from dotenv import load_dotenv
import uuid
import os
import datetime
from inngest.experimental import ai
import google.generativeai as genai
