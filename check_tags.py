import re

with open('App.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Regular expression to find JSX tags: opening <Tag...>, closing </Tag>
regex = re.compile(r'<(/)?([a-zA-Z0-9.:_-]+)')

# List of tags we care about
html_tags = {
    'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'footer', 'header',
    'svg', 'path', 'defs', 'linearGradient', 'stop', 'g', 'circle', 'button', 'a', 'b', 'i',
    'strong', 'em', 'img', 'br', 'hr', 'ul', 'li', 'ol', 'iframe', 'canvas', 'input', 'textarea',
    'select', 'option', 'form', 'label', 'motion.div', 'motion.button', 'motion.a', 'motion.path',
    'motion.circle', 'FAQ', 'HeroV2'
}

stack = []

for match in regex.finditer(code):
    is_closing = bool(match.group(1))
    tag_name = match.group(2)
    index = match.start()
    
    # Skip if not standard html tags and doesn't start with uppercase and not motion.
    if tag_name not in html_tags and not tag_name[0].isupper() and not tag_name.startswith('motion.'):
        continue
        
    # Calculate line number
    before = code[:index]
    line = before.count('\n') + 1
    
    # Simple check for comments
    last_line = before.split('\n')[-1]
    if '//' in last_line or '{/*' in last_line:
        continue
        
    # Check if self-closing
    rest = code[index:]
    next_greater = rest.find('>')
    if next_greater != -1:
        tag_content = rest[:next_greater + 1]
        if tag_content.strip().endswith('/>'):
            continue
            
    if is_closing:
        if not stack:
            print(f"Error: Closing tag </{tag_name}> at line {line} has no matching open tag!")
        else:
            match_idx = -1
            for i in range(len(stack) - 1, -1, -1):
                if stack[i]['name'] == tag_name:
                    match_idx = i
                    break
            
            if match_idx != -1:
                unclosed = stack[match_idx:]
                del stack[match_idx:]
                if len(unclosed) > 1:
                    print(f"Mismatch/Unclosed inside <{tag_name}> closed at line {line}:")
                    for j in range(1, len(unclosed)):
                        print(f"  - Unclosed <{unclosed[j]['name']}> opened at line {unclosed[j]['line']}")
            else:
                print(f"Error: Closing tag </{tag_name}> at line {line} has no matching open tag in stack!")
    else:
        stack.append({'name': tag_name, 'line': line})

print("\nRemaining stack at end of file:")
for t in stack:
    print(f"- <{t['name']}> opened at line {t['line']}")
