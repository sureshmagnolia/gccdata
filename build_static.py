import os

def build():
    with open('AttendanceApp.html', 'r', encoding='utf-8') as f:
        app = f.read()
    with open('ClientScript.html', 'r', encoding='utf-8') as f:
        client = f.read()
    
    target = "<?!= include('ClientScript'); ?>"
    if target not in app:
        raise ValueError("Target include tag not found in AttendanceApp.html")
    
    compiled = app.replace(target, client)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(compiled)
    with open('404.html', 'w', encoding='utf-8') as f:
        f.write(compiled)
    
    print(f"Successfully compiled index.html and 404.html (size: {len(compiled)} bytes)")

if __name__ == '__main__':
    build()
