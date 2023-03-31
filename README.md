# FinDox - Simple Deal Search & Document Viewer

## Live preview

https://github.com/fershopls/findex-super-professional-app

## Highlights
- Beautiful Composables in @/support.ts file!!
- Sort value for tables for more natural sorting! EX. Sorting by file size on string would put together 11KB and 15MB. Using sort values, we can specify the value that should be used for sorting.
- Using Antfu Vue Unplug & Auto import to ease development experience
- Using tailwind for fast component prototyping and elegant styling
- Using Vite for fast hot reload and TS support

## Overview
FinDox is a simple web application that allows users to search for deals and view associated documents.
This project is built using the Composition API in Vue.js 3.

## Features
- Search for deals using the search box
- Sort columns and filter rows with specific items
- Drill down into a deal to see the list of documents underneath it
- Filter the list of documents by tags
- Grid component supporting:
    - Column sorting
    - Filtering in the column header
    - Multi-select
    - Handling thousands of records and dozens of columns
    - Exporting data

## Installation & Setup
1. Clone the repository
```bash
git clone git@github.com:fershopls/findex-super-professional-app.git
```

2. Change into the project directory
```bash
cd findex-super-professional-app
```

3. Install dependencies
```bash
npm install
```

4. Start the application
```bash
npm run serve
```

5. Open the application in your browser
```bash
http://127.0.0.1:5173/
```


# Usage
Enter the desired search text in the search box to filter deals.
Sort columns by clicking on the column header, apply the filters by selecting the checkboxes.
Click on a deal to view the associated documents.

# Exporting Data
To export the data, click on the 'Export' button on the deals or documents page. The data will be exported as a CSV file.
