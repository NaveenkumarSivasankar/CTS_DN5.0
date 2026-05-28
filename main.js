// Task 1
console.log("Welcome to the Community Portal");

window.onload = function () {
    alert("Welcome to CityConnect – Community Event Portal!");
    task3Render();
    task7Render();
    task8Render();
};

function task1Demo() {
    console.log("Task 1: script is working correctly.");
    var out = document.getElementById("task1Output");
    out.style.display = "block";
    out.textContent = "✓ console.log fired! Check the Console tab in DevTools (F12).";
}


// Task 2
const eventName = "Annual City Festival";
const eventDate = "15 Aug 2025";
let seats = 50;

var seatNum = document.getElementById ? document.getElementById("seatNum") : null;

function updateSeatDisplay() {
    var el = document.getElementById("seatNum");
    if (el) el.textContent = seats;
    var info = document.getElementById("task2Output");
    if (info) {
        info.textContent = `Event: "${eventName}" | Date: ${eventDate} | Seats left: ${seats}`;
    }
}

function addSeat() {
    seats++;
    updateSeatDisplay();
    console.log("Task 2: seat added. Seats =", seats);
}

function removeSeat() {
    seats--;
    updateSeatDisplay();
    console.log("Task 2: seat removed. Seats =", seats);
}


// Task 3
var allEvents = [
    { name: "Annual City Festival", date: "2025-08-15", category: "festival", seats: 100 },
    { name: "Sports Day",           date: "2025-08-22", category: "sports",   seats: 60  },
    { name: "Art Exhibition",       date: "2025-09-05", category: "art",      seats: 40  },
    { name: "Summer Concert",       date: "2025-09-20", category: "music",    seats: 200 },
    { name: "Farmers Market",       date: "2025-10-05", category: "market",   seats: 500 },
    { name: "Workshop on Baking",   date: "2025-10-12", category: "art",      seats: 10  },
    { name: "Old Event 2020",       date: "2020-01-01", category: "festival", seats: 0   },
    { name: "Full Event",           date: "2025-11-01", category: "music",    seats: 0   }
];

function task3Render() {
    var today = new Date();
    var container = document.getElementById("task3EventList");
    if (!container) return;
    container.innerHTML = "";

    allEvents.forEach(function (ev) {
        var evDate = new Date(ev.date);
        if (evDate < today || ev.seats <= 0) return;

        var p = document.createElement("p");
        p.textContent = "✔ " + ev.name + " (" + ev.date + ") – Seats: " + ev.seats;
        p.style.color = "#1b5e20";
        container.appendChild(p);
    });
}

function task3Register(name, seats) {
    var out = document.getElementById("task3Output");
    try {
        var today = new Date();
        var ev = allEvents.find(function (e) { return e.name === name; });
        if (!ev) throw new Error("Event not found: " + name);
        if (new Date(ev.date) < today) throw new Error("Cannot register for a past event.");
        if (ev.seats <= 0) throw new Error("No seats available for: " + name);
        ev.seats--;
        out.style.display = "block";
        out.style.background = "#e8f5e9";
        out.style.borderColor = "#2e7d32";
        out.textContent = "✓ Registered for \"" + name + "\". Seats left: " + ev.seats;
        console.log("Task 3: registered for", name);
    } catch (err) {
        out.style.display = "block";
        out.style.background = "#ffebee";
        out.style.borderColor = "#c62828";
        out.textContent = "✗ Error: " + err.message;
        console.error("Task 3 catch:", err.message);
    }
}


// Task 4
var categoryRegistrations = (function () {
    var counts = {};
    return {
        register: function (category) {
            counts[category] = (counts[category] || 0) + 1;
            return counts[category];
        },
        get: function (category) {
            return counts[category] || 0;
        }
    };
})();

function addEvent(name, date, category, seats) {
    allEvents.push({ name: name, date: date, category: category, seats: seats });
    console.log("Task 4: addEvent() called –", name);
}

function registerUser(eventName, callback) {
    var ev = allEvents.find(function (e) { return e.name === eventName; });
    if (ev && ev.seats > 0) {
        ev.seats--;
        if (callback) callback(ev);
    }
}

function filterEventsByCategory(category, callback) {
    return allEvents.filter(function (ev) {
        return callback ? callback(ev, category) : ev.category === category;
    });
}

function task4Filter() {
    var cat = document.getElementById("filterCategory4").value;
    var results = cat === "all"
        ? allEvents
        : filterEventsByCategory(cat, function (ev, c) { return ev.category === c; });

    var out = document.getElementById("task4Output");
    out.innerHTML = "";
    results.forEach(function (ev) {
        var p = document.createElement("p");
        p.textContent = "• " + ev.name + " [" + ev.category + "] – Seats: " + ev.seats;
        out.appendChild(p);
    });
    console.log("Task 4: filtered by", cat, "–", results.length, "results");
}

function task4AddEvent() {
    addEvent("Community Yoga", "2025-11-15", "sports", 30);
    document.getElementById("task4Output").innerHTML += "<p style='color:#2e7d32'>✓ Added: Community Yoga (sports, 30 seats)</p>";
}

function task4Register() {
    registerUser("Sports Day", function (ev) {
        var count = categoryRegistrations.register(ev.category);
        var el = document.getElementById("task4Counter");
        el.textContent = "Closure counter – total '" + ev.category + "' registrations: " + count;
        console.log("Task 4: closure counter for", ev.category, "=", count);
    });
}


// Task 5
function Event(name, date, category, seats, venue) {
    this.name     = name;
    this.date     = date;
    this.category = category;
    this.seats    = seats;
    this.venue    = venue;
}

Event.prototype.checkAvailability = function () {
    return this.seats > 0 ? "Available (" + this.seats + " seats)" : "Fully Booked";
};

function task5Demo() {
    var ev = new Event("Annual City Festival", "2025-08-15", "festival", 100, "City Central Park");
    var out = document.getElementById("task5Output");
    var lines = ["Object: Event"];

    Object.entries(ev).forEach(function (entry) {
        lines.push("  " + entry[0] + ": " + entry[1]);
    });

    lines.push("  checkAvailability(): " + ev.checkAvailability());
    lines.push("\nPrototype method: Event.prototype.checkAvailability");
    lines.push("Object.entries() used to list all key-value pairs above.");

    out.textContent = lines.join("\n");
    out.style.display = "block";
    console.log("Task 5: Event object –", ev);
    console.log("Task 5: checkAvailability –", ev.checkAvailability());
    console.log("Task 5: Object.entries –", Object.entries(ev));
}


// Task 6
function task6Push() {
    var newEv = { name: "Night Market", date: "2025-12-01", category: "market", seats: 200 };
    allEvents.push(newEv);
    var out = document.getElementById("task6Output");
    out.innerHTML = "<p style='color:#2e7d32'>✓ push() added: <strong>Night Market</strong>. Total events: " + allEvents.length + "</p>";
    console.log("Task 6: push() – total events:", allEvents.length);
}

function task6Filter() {
    var music = allEvents.filter(function (ev) { return ev.category === "music"; });
    var out = document.getElementById("task6Output");
    out.innerHTML = "<p><strong>filter() – Music events only:</strong></p>";
    music.forEach(function (ev) {
        out.innerHTML += "<p>• " + ev.name + " (" + ev.date + ")</p>";
    });
    console.log("Task 6: filter() music events –", music);
}

function task6Map() {
    var cards = allEvents.map(function (ev) {
        return ev.category.charAt(0).toUpperCase() + ev.category.slice(1) + " – " + ev.name;
    });
    var out = document.getElementById("task6Output");
    out.innerHTML = "<p><strong>map() – Formatted cards:</strong></p>";
    cards.forEach(function (c) {
        out.innerHTML += "<p>• " + c + "</p>";
    });
    console.log("Task 6: map() formatted cards –", cards);
}


// Task 7
function task7Render() {
    var container = document.getElementById("eventList");
    if (!container) return;
    container.innerHTML = "";
    var today = new Date();

    allEvents.forEach(function (ev, index) {
        if (new Date(ev.date) < today) return;

        var card = document.createElement("div");
        card.className = "event-card";
        card.setAttribute("data-index", index);

        var badge = document.createElement("span");
        badge.className = "badge badge-" + ev.category;
        badge.textContent = ev.category;

        var title = document.createElement("h3");
        title.textContent = ev.name;

        var date = document.createElement("p");
        date.textContent = "📅 " + ev.date;

        var seatEl = document.createElement("p");
        seatEl.className = ev.seats > 0 ? "seats-ok" : "seats-full";
        seatEl.textContent = ev.seats > 0 ? "✓ Seats: " + ev.seats : "✗ Fully Booked";
        seatEl.id = "seats-" + index;

        var btn = document.createElement("button");
        btn.className = "register-btn";
        btn.textContent = ev.seats > 0 ? "Register" : "Full";
        btn.disabled = ev.seats <= 0;
        btn.onclick = function () { task7Register(index); };

        card.appendChild(badge);
        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(seatEl);
        card.appendChild(btn);
        container.appendChild(card);
    });

    console.log("Task 7: DOM rendered with", container.children.length, "cards");
}

function task7Register(index) {
    var ev = allEvents[index];
    if (!ev || ev.seats <= 0) return;
    ev.seats--;

    var seatEl = document.getElementById("seats-" + index);
    if (seatEl) {
        seatEl.textContent = ev.seats > 0 ? "✓ Seats: " + ev.seats : "✗ Fully Booked";
        seatEl.className   = ev.seats > 0 ? "seats-ok" : "seats-full";
    }

    var card  = document.querySelector('[data-index="' + index + '"]');
    var btn   = card ? card.querySelector("button") : null;
    if (btn && ev.seats <= 0) { btn.textContent = "Full"; btn.disabled = true; }

    console.log("Task 7: registered for", ev.name, "| seats left:", ev.seats);
}


// Task 8
function task8Render(filter, search) {
    var container = document.getElementById("task8List");
    if (!container) return;
    container.innerHTML = "";
    var today = new Date();

    allEvents.forEach(function (ev) {
        if (new Date(ev.date) < today) return;
        if (filter && filter !== "all" && ev.category !== filter) return;
        if (search && !ev.name.toLowerCase().includes(search.toLowerCase())) return;

        var p = document.createElement("p");
        p.textContent = "• " + ev.name + " [" + ev.category + "] – " + ev.date;
        container.appendChild(p);
    });
}

function task8Filter() {
    var cat    = document.getElementById("categoryFilter").value;
    var search = document.getElementById("searchInput").value;
    task8Render(cat, search);
    console.log("Task 8: onchange filter –", cat);
}

function task8Search(event) {
    var search = event.target.value;
    var cat    = document.getElementById("categoryFilter").value;
    task8Render(cat, search);
    console.log("Task 8: keydown search –", search);
}


// Task 9
function task9Promise() {
    var spinner = document.getElementById("spinner");
    var out     = document.getElementById("task9Output");
    var status  = document.getElementById("asyncStatus");

    spinner.style.display = "block";
    out.innerHTML = "";
    status.style.display = "none";

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=4")
        .then(function (res) {
            if (!res.ok) throw new Error("Network response not OK");
            return res.json();
        })
        .then(function (data) {
            spinner.style.display = "none";
            status.style.display  = "block";
            status.style.background = "#e8f5e9";
            status.style.color      = "#1b5e20";
            status.style.padding    = "10px 14px";
            status.style.borderRadius = "6px";
            status.textContent = "✓ .then() – Fetched " + data.length + " mock records successfully.";

            data.forEach(function (item) {
                var p = document.createElement("p");
                p.textContent = "• [ID " + item.id + "] " + item.title.substring(0, 60) + "...";
                out.appendChild(p);
            });
            console.log("Task 9: .then() success –", data.length, "items");
        })
        .catch(function (err) {
            spinner.style.display = "none";
            status.style.display  = "block";
            status.style.background = "#ffebee";
            status.textContent = "✗ .catch() error: " + err.message;
            console.error("Task 9: .catch() –", err.message);
        });
}

async function task9Async() {
    var spinner = document.getElementById("spinner");
    var out     = document.getElementById("task9Output");
    var status  = document.getElementById("asyncStatus");

    spinner.style.display = "block";
    out.innerHTML = "";
    status.style.display = "none";

    try {
        var res  = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=4");
        if (!res.ok) throw new Error("Network response not OK");
        var data = await res.json();

        spinner.style.display = "none";
        status.style.display  = "block";
        status.style.background = "#e8f5e9";
        status.style.color      = "#1b5e20";
        status.style.padding    = "10px 14px";
        status.style.borderRadius = "6px";
        status.textContent = "✓ async/await – Fetched " + data.length + " mock records successfully.";

        data.forEach(function (item) {
            var p = document.createElement("p");
            p.textContent = "• [ID " + item.id + "] " + item.title.substring(0, 60) + "...";
            out.appendChild(p);
        });
        console.log("Task 9: async/await success –", data.length, "items");
    } catch (err) {
        spinner.style.display = "none";
        status.style.display  = "block";
        status.style.background = "#ffebee";
        status.textContent = "✗ async/await error: " + err.message;
        console.error("Task 9: async/await error –", err.message);
    }
}


// Task 10
function task10Demo() {
    var out = document.getElementById("task10Output");
    out.style.display = "block";
    out.textContent = "";

    // let and const
    const portalName = "CityConnect";
    let activeUsers  = 120;
    var lines = [];
    lines.push("const portalName = \"" + portalName + "\"");
    lines.push("let activeUsers  = " + activeUsers);

    // Default parameters
    function greetUser(name = "Resident", role = "visitor") {
        return "Hello, " + name + "! Role: " + role;
    }
    lines.push("\nDefault params: " + greetUser());
    lines.push("Default params: " + greetUser("Priya", "admin"));

    // Destructuring
    var { name, date, category, seats: available } = allEvents[0];
    lines.push("\nDestructuring allEvents[0]:");
    lines.push("  name: " + name + " | date: " + date + " | category: " + category + " | available: " + available);

    // Spread operator to clone before filtering
    var cloned   = [...allEvents];
    var filtered = cloned.filter(function (ev) { return ev.category === "music"; });
    lines.push("\nSpread clone length: " + cloned.length + " (original unchanged: " + allEvents.length + ")");
    lines.push("Filtered music from clone: " + filtered.map(function (e) { return e.name; }).join(", "));

    out.textContent = lines.join("\n");
    console.log("Task 10: ES6+ demo complete");
}


// Task 11
function task11Submit(event) {
    event.preventDefault();

    var form     = document.getElementById("registrationForm");
    var name     = form.elements["regName"].value.trim();
    var email    = form.elements["regEmail"].value.trim();
    var selected = form.elements["regEvent"].value;

    var nameErr  = document.getElementById("nameError");
    var emailErr = document.getElementById("emailError");
    var evErr    = document.getElementById("eventError");
    var out      = document.getElementById("task11Output");

    var valid = true;

    if (!name) {
        nameErr.style.display = "block"; valid = false;
    } else {
        nameErr.style.display = "none";
    }

    if (!email || !email.includes("@")) {
        emailErr.style.display = "block"; valid = false;
    } else {
        emailErr.style.display = "none";
    }

    if (!selected) {
        evErr.style.display = "block"; valid = false;
    } else {
        evErr.style.display = "none";
    }

    if (valid) {
        out.style.display = "block";
        out.textContent = "✓ Registered: " + name + " for " + selected + " (" + email + ")";
        console.log("Task 11: form submitted –", { name, email, selected });
    } else {
        console.warn("Task 11: validation failed");
    }
}


// Task 12
function task12Submit() {
    var out = document.getElementById("task12Output");
    out.innerHTML = "<p style='color:#1a4a1a;'>⏳ Sending registration... (setTimeout 1.5s delay)</p>";
    console.log("Task 12: fetch POST initiated");

    setTimeout(function () {
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ name: "Priya Ramesh", email: "priya@example.com", event: "festival" })
        })
        .then(function (res) {
            if (!res.ok) throw new Error("Server error " + res.status);
            return res.json();
        })
        .then(function (data) {
            out.innerHTML =
                "<p style='color:#1b5e20;font-weight:bold;'>✓ Success! Mock API responded with ID: " + data.id + "</p>" +
                "<pre style='background:#f1f8e9;padding:10px;border-radius:6px;font-size:0.83rem;'>" +
                JSON.stringify(data, null, 2) + "</pre>";
            console.log("Task 12: POST success –", data);
        })
        .catch(function (err) {
            out.innerHTML = "<p style='color:#c62828;font-weight:bold;'>✗ Failed: " + err.message + "</p>";
            console.error("Task 12: POST error –", err.message);
        });
    }, 1500);
}


// Task 13
function task13Debug() {
    var out = document.getElementById("task13Output");
    out.style.display = "block";
    var log = [];

    console.log("Task 13: debug step 1 – starting");
    log.push("Step 1: Debug started");

    var testEvents = allEvents.slice(0, 3);
    console.log("Task 13: debug step 2 – testEvents:", testEvents);
    log.push("Step 2: Loaded " + testEvents.length + " events for inspection");

    var seatTotal = testEvents.reduce(function (sum, ev) { return sum + ev.seats; }, 0);
    console.log("Task 13: debug step 3 – total seats:", seatTotal);
    log.push("Step 3: Total seats across test events: " + seatTotal);

    log.push("\nAdd a breakpoint in main.js at task13Debug() in Sources tab to watch these values.");
    log.push("Check the Network tab while running Task 12 to see the POST payload.");

    out.textContent = log.join("\n");
}

function task13BuggyCode() {
    var out = document.getElementById("task13Output");
    out.style.display = "block";
    try {
        // Deliberate bug: accessing property of undefined
        var x = null;
        console.log("Task 13: about to trigger bug...");
        var val = x.name;
        out.textContent = val;
    } catch (err) {
        out.textContent = "✗ Bug caught by try-catch!\nError: " + err.message +
            "\n\nCheck Console tab in DevTools to see the full stack trace.";
        console.error("Task 13: intentional bug caught –", err.message);
    }
}


// Task 14
$(document).ready(function () {

    $("#registerBtn").click(function () {
        $("#jqOutput").text("✓ jQuery click handled on #registerBtn – $('#registerBtn').click()");
        console.log("Task 14: jQuery click event fired");
    });

    $("#fadeOutBtn").click(function () {
        $(".jq-card").fadeOut(600);
        $("#jqOutput").text("fadeOut() applied to all .jq-card elements");
        console.log("Task 14: fadeOut()");
    });

    $("#fadeInBtn").click(function () {
        $(".jq-card").fadeIn(600);
        $("#jqOutput").text("fadeIn() applied to all .jq-card elements");
        console.log("Task 14: fadeIn()");
    });

    console.log("Task 14: jQuery ready, version", $.fn.jquery);
});
