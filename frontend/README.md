# InsightForge AI

InsightForge AI is an AI-powered product intelligence platform that analyzes issues from public GitHub repositories and transforms recurring user problems into actionable product opportunities.

The application combines GitHub issue data, semantic embeddings, HDBSCAN clustering, local LLMs through Ollama, and PostgreSQL persistence to produce structured product insights.

## Features

- GitHub repository issue analysis
- Automatic issue preprocessing
- Semantic embeddings using Nomic Embed Text
- HDBSCAN-based issue clustering
- AI-generated cluster summaries
- AI-generated business opportunities
- AI solution recommendations
- Target customer identification
- MVP feature recommendations
- Market potential estimation
- Confidence scoring
- Persistent analysis history
- Dashboard statistics
- Detailed analysis reports
- Authentication
- Background analysis processing

## Analysis Workflow

```text
GitHub Repository
        ↓
GitHub Issues
        ↓
Text Preprocessing
        ↓
Nomic Embed Text
        ↓
768-Dimensional Embeddings
        ↓
HDBSCAN Clustering
        ↓
Llama 3.2
        ↓
Cluster Summarization
        ↓
Product Opportunity Generation
        ↓
PostgreSQL
        ↓
Dashboard / Reports