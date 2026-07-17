FROM node:24-slim

WORKDIR /app

# Copy backend package files and install
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy frontend package files and install
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source files
COPY backend ./backend
COPY frontend ./frontend

# Build frontend production bundle & seed SQLite
RUN cd frontend && npm run build
RUN cd backend && npm run seed

# Hugging Face Spaces Port Specification
ENV PORT=7860
EXPOSE 7860

# Start server
CMD ["npm", "run", "start", "--prefix", "backend"]
