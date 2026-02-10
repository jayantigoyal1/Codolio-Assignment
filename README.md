# Codolio-Assignment
# Interactive Question Management Sheet

A high-performance, single-page application built for managing hierarchical DSA question sets.

## ✨ Functional Requirements Met
- **Add/Edit/Delete Topic**: Fully implemented at the top-level.
- **Add/Edit/Delete Sub-topic**: Managed within each topic section.
- **Add/Edit/Delete Question**: Complete CRUD for individual questions.
- **Reorder Elements**: Integrated `@dnd-kit` for drag-and-drop reordering of Topics and Questions.

## 🛠️ Technical Implementation
- **Framework**: React with Vite.
- **State Management**: **Zustand** with `persist` middleware for LocalStorage synchronization.
- **Styling**: **Tailwind CSS v4** for a modern dark-theme UI.
- **Data Integration**: Automatically populates from the provided `sheet.json` dataset.

## 🚀 Getting Started
1. Clone the repo: `git clone https://github.com/jayantigoyal1/Codolio-Assignment.git`
2. Install: `npm install`
3. Launch: `npm run dev`
