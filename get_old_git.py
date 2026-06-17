import subprocess
import os

repo_dir = r"c:\Users\Jean\Desktop\landing-V2-super-checkout-.app"

try:
    # Get old App.tsx
    old_app = subprocess.check_output(
        ["git", "show", "HEAD~1:App.tsx"],
        cwd=repo_dir,
        text=True,
        encoding="utf-8"
    )
    
    # Save it to a temp file
    with open(os.path.join(repo_dir, "App_old.tsx"), "w", encoding="utf-8") as f:
        f.write(old_app)

    # Get old globals.css
    old_css = subprocess.check_output(
        ["git", "show", "HEAD~1:app/globals.css"],
        cwd=repo_dir,
        text=True,
        encoding="utf-8"
    )
    
    with open(os.path.join(repo_dir, "globals_old.css"), "w", encoding="utf-8") as f:
        f.write(old_css)

    print("Successfully retrieved old files!")
except Exception as e:
    print(f"Error: {e}")
