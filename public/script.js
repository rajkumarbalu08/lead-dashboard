function handleLogin() {
    console.log("Button clicked!"); // Debug
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        console.log("Fetch response:", response); // Debug
        return response.json();
    })
    .then(result => {
        console.log("Server said:", result); // Debug
        if (result.success) {
            document.getElementById("login").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
            loadDashboard();
        } else {
            document.getElementById("error").style.display = "block";
        }
    })
    .catch(error => console.error("Error:", error)); // Debug
}

function loadDashboard() {
    fetch("/leads")
        .then(response => response.json())
        .then(data => {
            document.getElementById("total-leads").textContent = data.totalLeads;
            document.getElementById("progress").value = data.totalLeads;
            document.getElementById("progress-text").textContent = `${data.totalLeads}/100`;
            document.getElementById("conv-rate").textContent = ((data.pipeline.Converted / data.totalLeads) * 100).toFixed(1) + "%";

            new Chart(document.getElementById("timeChart").getContext("2d"), {
                type: "line",
                data: {
                    labels: ["Mar 13", "Mar 14", "Mar 15", "Mar 16", "Mar 17"],
                    datasets: [{ label: "Leads", data: data.leadsOverTime, borderColor: "#003087", fill: false }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });

            new Chart(document.getElementById("sourceChart").getContext("2d"), {
                type: "bar",
                data: {
                    labels: Object.keys(data.leadSources),
                    datasets: [{ label: "Sources", data: Object.values(data.leadSources), backgroundColor: "#003087" }]
                },
                options: { scales: { y: { beginAtZero: true } } }
            });

            new Chart(document.getElementById("pipelineChart").getContext("2d"), {
                type: "pie",
                data: {
                    labels: Object.keys(data.pipeline),
                    datasets: [{ data: Object.values(data.pipeline), backgroundColor: ["#003087", "#0055d4", "#87cefa", "#b0e0e6"] }]
                }
            });
        });
}