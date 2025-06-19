// lib/format.ts

export function formatGeminiOutput(raw: string): string {
    const lines = raw.split("\n");
  
    let html = "";
    let inList = false;
  
    for (let line of lines) {
      line = line.trim();
  
      if (!line) {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += "<br/>";
        continue;
      }
  
      // Bold
      line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  
      // Headings
      if (line.startsWith("### ")) {
        html += `<h3 class="text-lg font-semibold mb-1">${line.slice(4)}</h3>`;
      } else if (line.startsWith("## ")) {
        html += `<h2 class="text-xl font-bold mb-2">${line.slice(3)}</h2>`;
      } else if (line.startsWith("# ")) {
        html += `<h1 class="text-2xl font-bold mb-3">${line.slice(2)}</h1>`;
      }
  
      // Bullets
      else if (line.startsWith("* ") || line.startsWith("- ")) {
        if (!inList) {
          html += "<ul class='list-disc list-inside space-y-1'>";
          inList = true;
        }
        html += `<li>${line.slice(2)}</li>`;
      }
  
      // Normal line
      else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += `<p>${line}</p>`;
      }
    }
  
    if (inList) html += "</ul>";
  
    return html;
  }


