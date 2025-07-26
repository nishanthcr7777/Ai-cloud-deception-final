import pygame, sys, time, random, textwrap

# === CONFIG ===
TERMINAL_TITLE = "Kali Linux Terminal"
TEXT_COLOR = (255, 255, 255)
CURSOR_COLOR = (255, 255, 255)  # White blinking cursor
BG_COLOR = (0, 0, 0)
SCROLL_SPEED = 3
WRAP_MARGIN = 30  # padding for line wrap

pygame.init()
WIDTH, HEIGHT = 950, 550
screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.RESIZABLE)  # resizable window
pygame.display.set_caption(TERMINAL_TITLE)

font = pygame.font.SysFont("monospace", 20)
line_height = font.get_linesize() + 4

# === FIXED KALI BANNER ===
KALI_BANNER = [
    "  _  __    _    _ ",
    " | |/ /   / \\  | |",
    " | ' /   / _ \\ | |",
    " | . \\  / ___ \\| |_",
    " ||\\\\//   \\\\_|",
    "-------------------------",
    "     Kali Linux Terminal",
    "-------------------------"
]

lines = KALI_BANNER + ["Welcome to Kali Linux!", ""]
prompt = "root@kali:~# "
current_input = ""
cursor_pos = 0
running = True

# === SCROLLING ===
scroll_offset = 0

# === METASPLOIT STATE ===
msf_mode = False
msf_target = None
msf_module_selected = False

# === CURSOR BLINKING ===
cursor_visible = True
cursor_timer = 0
cursor_blink_rate = 500  # ms


# === TEXT WRAPPING ===
def wrap_line(line, width):
    """Wrap text to fit screen width."""
    max_chars = max(1, (width - WRAP_MARGIN) // 12)  # approx chars per line
    return textwrap.wrap(line, max_chars)


def add_wrapped_line(text):
    """Adds a line with auto-wrapping and auto-scrolls down."""
    global scroll_offset
    for wrapped in wrap_line(text, WIDTH):
        lines.append(wrapped)
        # auto-scroll for each wrapped line
        scroll_offset = max(0, len(lines) - (HEIGHT // line_height))


# === DRAW TERMINAL ===
def update_screen():
    screen.fill(BG_COLOR)

    total_lines = len(lines)
    max_visible_lines = HEIGHT // line_height
    max_scroll = max(0, total_lines - max_visible_lines)

    global scroll_offset
    scroll_offset = max(0, min(scroll_offset, max_scroll))

    # Draw visible lines
    start_line = scroll_offset
    end_line = start_line + max_visible_lines
    y = 10

    for line in lines[start_line:end_line]:
        rendered_line = font.render(line, True, TEXT_COLOR)
        screen.blit(rendered_line, (10, y))
        y += line_height

    # Draw prompt at bottom if at latest output
    if scroll_offset == max_scroll:
        left_text = prompt + current_input[:cursor_pos]
        right_text = current_input[cursor_pos:]

        rendered_left = font.render(left_text, True, TEXT_COLOR)
        prompt_y = HEIGHT - line_height - 10
        screen.blit(rendered_left, (10, prompt_y))

        cursor_x = rendered_left.get_width() + 10
        cursor_y = prompt_y

        if cursor_visible:
            pygame.draw.rect(screen, CURSOR_COLOR, (cursor_x, cursor_y + 4, 10, line_height - 8))

        rendered_right = font.render(right_text, True, TEXT_COLOR)
        screen.blit(rendered_right, (cursor_x, prompt_y))

    # Scrollbar
    if total_lines > max_visible_lines:
        scrollbar_height = int((max_visible_lines / total_lines) * HEIGHT)
        scrollbar_pos = int((scroll_offset / total_lines) * HEIGHT)
        pygame.draw.rect(screen, (100, 100, 100),
                         (WIDTH - 10, scrollbar_pos, 8, scrollbar_height))

    pygame.display.flip()


# === REAL-TIME OUTPUT ===
def slow_output(output_text, delay=0.05):
    """Prints output line by line with scrolling like a real terminal."""
    global scroll_offset
    for raw_line in output_text.split("\n"):
        wrapped_lines = wrap_line(raw_line, WIDTH)
        for wline in wrapped_lines:
            lines.append(wline)
            scroll_offset = max(0, len(lines) - (HEIGHT // line_height))  # scroll down after each line
            update_screen()
            time.sleep(delay)


def metasploit_banner():
    return (
        "       .                                         .\n"
        "  .                                           .\n"
        "     .       .        .                 .\n"
        " .       *         .       .\n"
        "                 .     .   _________\n"
        "        .  . *           .`         `.\n"
        "             .      .    |  METASPLOIT |\n"
        "  . .           .        |   FRAMEWORK |\n"
        "        .    .   .       |_|\n"
        "  .                 .    `.   v6.4.0  .'\n"
        "        *   .     .        `---------'\n\n"
        "       =[ metasploit v6.4.0-dev                          ]\n"
        "+ -- --=[ 2234 exploits - 1177 auxiliary - 400 payloads  ]\n"
        "+ -- --=[ 45 encoders - 10 nops                          ]\n"
        "+ -- --=[ 6 evasion                                      ]\n\n"
        "[*] Starting the Metasploit Framework console...\n"
        "[*] Loading modules, please wait...\n"
        "[*] flooding syn packets into cloud ..... Done!!! \n"
    )


def run_ddos(target):
    """Simulated DDoS attack with scrolling output"""
    slow_output(f"[*] Launching SYN Flood attack on {target}...\n", delay=0.05)
    time.sleep(0.5)

    for i in range(1, 11):
        pkt = random.randint(50000, 99999)
        bw = random.uniform(10.5, 50.2)
        slow_output(f"[{i*10}%] Sent {pkt} SYN packets | {bw:.2f} MB/s\n", delay=0.05)

    slow_output(f"[+] SYN Flood complete! {target} appears unresponsive ✅\n", delay=0.05)


def shortcut_ddos(target):
    slow_output("[*] Auto-loading module auxiliary/dos/tcp/synflood\n", delay=0.05)
    time.sleep(0.5)
    run_ddos(target)


# === MAIN LOOP ===
clock = pygame.time.Clock()

while running:
    dt = clock.tick(30)
    cursor_timer += dt
    if cursor_timer >= cursor_blink_rate:
        cursor_visible = not cursor_visible
        cursor_timer = 0

    update_screen()

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        elif event.type == pygame.VIDEORESIZE:
            WIDTH, HEIGHT = event.w, event.h
            screen = pygame.display.set_mode((WIDTH, HEIGHT), pygame.RESIZABLE)

        elif event.type == pygame.KEYDOWN:
            # Cursor movement
            if event.key == pygame.K_LEFT:
                if cursor_pos > 0:
                    cursor_pos -= 1
            elif event.key == pygame.K_RIGHT:
                if cursor_pos < len(current_input):
                    cursor_pos += 1
            elif event.key == pygame.K_HOME:
                cursor_pos = 0
            elif event.key == pygame.K_END:
                cursor_pos = len(current_input)
            elif event.key == pygame.K_BACKSPACE:
                if cursor_pos > 0:
                    current_input = current_input[:cursor_pos - 1] + current_input[cursor_pos:]
                    cursor_pos -= 1
            elif event.key == pygame.K_DELETE:
                if cursor_pos < len(current_input):
                    current_input = current_input[:cursor_pos] + current_input[cursor_pos + 1:]
            elif event.key == pygame.K_RETURN:
                command = current_input.strip()
                add_wrapped_line(prompt + current_input)
                update_screen()
                time.sleep(0.1)

                # Normal mode
                if not msf_mode:
                    if command == "exit":
                        slow_output("Exiting terminal...\n", delay=0.05)
                        running = False
                    elif command == "clear":
                        lines.clear()
                    elif command == "msfconsole":
                        slow_output(metasploit_banner(), delay=0.03)
                        msf_mode = True
                        prompt = "msf6 > "
                    elif command.startswith("ddos "):
                        target = command.split(" ", 1)[1]
                        shortcut_ddos(target)
                    else:
                        slow_output(f"bash: {command}: command not found\n", delay=0.03)
                else:
                    # msfconsole mode
                    if command == "exit":
                        slow_output("[*] Exiting msfconsole...\n", delay=0.05)
                        msf_mode = False
                        msf_target = None
                        msf_module_selected = False
                        prompt = "root@kali:~# "
                    elif command.startswith("use auxiliary/dos/tcp/synflood"):
                        slow_output("[*] Loaded module: auxiliary/dos/tcp/synflood\n", delay=0.03)
                        msf_module_selected = True
                    elif command.startswith("set RHOST"):
                        if msf_module_selected:
                            parts = command.split()
                            if len(parts) > 2:
                                msf_target = parts[2]
                                slow_output(f"RHOST => {msf_target}\n", delay=0.03)
                            else:
                                slow_output("Usage: set RHOST <target>\n", delay=0.03)
                        else:
                            slow_output("No module selected. Use 'use auxiliary/dos/tcp/synflood' first.\n", delay=0.03)
                    elif command == "run":
                        if msf_module_selected and msf_target:
                            run_ddos(msf_target)
                        else:
                            slow_output("You must set RHOST before running the module.\n", delay=0.03)
                    elif command.startswith("search"):
                        slow_output("Matching Modules:\nauxiliary/dos/tcp/synflood\nauxiliary/dos/http/slowloris\n", delay=0.03)
                    elif command == "info":
                        if msf_module_selected:
                            slow_output(
                                "Name: SYN Flood DoS\nModule: auxiliary/dos/tcp/synflood\nDescription: Floods target with SYN packets.\n",
                                delay=0.03)
                        else:
                            slow_output("No module selected.\n", delay=0.03)
                    else:
                        slow_output(f"Unknown msf command: {command}\n", delay=0.03)

                current_input = ""
                cursor_pos = 0
            else:
                if event.unicode.isprintable():
                    current_input = current_input[:cursor_pos] + event.unicode + current_input[cursor_pos:]
                    cursor_pos += 1

        elif event.type == pygame.MOUSEBUTTONDOWN:
            if event.button == 4:
                scroll_offset -= SCROLL_SPEED
            elif event.button == 5:
                scroll_offset += SCROLL_SPEED

        elif event.type == pygame.KEYUP:
            if event.key == pygame.K_PAGEUP:
                scroll_offset -= SCROLL_SPEED * 5
            elif event.key == pygame.K_PAGEDOWN:
                scroll_offset += SCROLL_SPEED * 5

pygame.quit()
sys.exit()
