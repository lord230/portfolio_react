import urllib.request
import json
repos = ["Lifenumber", "snake_game", "Sorting_visuals", "flying_rock_paper_scissors", "auto-scheduling", "Mandelbrot", "Hand-Gesture", "face_cursor_movement", "Weather_app", "LAN-TRANSFER", "Clipperboard", "custom_C-_Neural_network", "Rotating_shapes"]

for repo in repos:
    try:
        url = f"https://api.github.com/repos/lord230/{repo}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req).read().decode()
        desc = json.loads(res).get("description", "")
        print(f"[{repo}]: {desc}")
    except Exception as e:
        print(f"[{repo}]: ERROR {e}")
