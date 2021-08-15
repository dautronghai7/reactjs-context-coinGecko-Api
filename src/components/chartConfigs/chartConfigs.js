export const historyOptions = {
    plugins: {
      title: {
        text: 'Chart.js Time Scale',
        display: false
      }
    },
    responsive: true,
    animation:{
    duration: 10},
    scales: {
      x: {
        type: 'time',
        time: {
          // Luxon format string
          tooltipFormat: 'DD'
        },
        title: {
          display: true,
          text: 'Date'
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value'
        },
      //  min: 0,
      //   max: 200,
        ticks: {
          // forces step size to be 50 units
          display: false,
          stepSize: 1
        }
      }
    },
}