const labels = ["Category 1", "Category 2", "Category 3"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Series 1",
      backgroundColor: "#5a9bd3",
      data: [29, 10, 5],
    },
    {
      label: "Series 2",
      backgroundColor: "#ef7e2e",
      data: [89, 2, 45],
    },
    {
      label: "Series 3",
      backgroundColor: "#a5a5a5",
      data: [50, 85, 22],
    },
  ],
};

const config = {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const myChart = new Chart(document.getElementById("chart"), config);
