#!/bin/zsh

# Configuration
SRC_DIR="./"               # where your .md files are
OUT_DIR="./dist"           # output folder
OUT_FILE="output.html"     # final combined HTML file

mkdir -p "$OUT_DIR"

# Temporary file to collect converted HTML
TEMP_FILE="$(mktemp)"

echo "<!-- Auto-generated file -->" > "$TEMP_FILE"
echo "<html><body>" >> "$TEMP_FILE"

# Loop through each markdown file
for file in "$SRC_DIR"/*.md; do
    echo "Processing $file ..."
    
    # Convert each markdown file to HTML fragment (no <html> wrapper)
    pandoc "$file" -f markdown -t html >> "$TEMP_FILE"
    
    echo "<hr/>" >> "$TEMP_FILE"
done

echo "</body></html>" >> "$TEMP_FILE"

# Move final combined file
mv "$TEMP_FILE" "$OUT_DIR/$OUT_FILE"

echo "Done! Output: $OUT_DIR/$OUT_FILE"