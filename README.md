# Sales Deck Generator Frontend

A modern React application for generating professional sales presentations using AI.

## Features

- **Professional Interface**: Clean, modern design with intuitive user experience
- **Comprehensive Form**: All required fields with real-time validation
- **Logo Upload**: Drag-and-drop file upload with preview and validation
- **AI-Powered Generation**: Integrates with GPT-4 to create compelling sales content
- **Instant Download**: Generated PowerPoint files ready for immediate use
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern, responsive styling
- **Lucide React** for beautiful icons
- **Vite** for fast development and building

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Backend API running (see backend setup instructions)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your backend URL:
   ```
   VITE_API_URL=http://localhost:5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

Make sure your Python backend is running with:
- Flask server on port 5000
- OpenAI API key configured
- All required dependencies installed

## Usage

1. Fill out the form with your company details:
   - Company name
   - Industry
   - Target buyer persona
   - Main pain point
   - Specific use case

2. Optionally upload a company logo (PNG, JPEG, GIF up to 16MB)

3. Click "Generate Sales Deck" to create your presentation

4. Download the generated PowerPoint file

## API Integration

The frontend communicates with the backend through:
- `POST /generate-deck` - Generate new presentation
- `GET /download/{file_id}` - Download generated file
- `GET /health` - Health check

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/          # React components
├── services/           # API service layer
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── App.tsx            # Main application component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.