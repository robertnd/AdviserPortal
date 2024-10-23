import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AlertOptions } from '@app/_models'
import { AlertService, UtilService } from '@app/_services'
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // journeySubscription!: Subscription
  journey: string = ''
  count: number = 0
  chart: any
  pie_chart: any
  scatter_chart: any

  ticksStyle = {
    fontColor: '#495057',
    fontStyle: 'bold'
  }

  mode = 'index'
  intersect = true

  constructor(private alertService: AlertService,
    private utilService: UtilService
  ) {
  }

  ngOnInit() {
    this.journey = this.utilService.getCurrentJourney() || ''
    this.utilService.unsetJourney()

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['18th', '20th', '22nd', '24th', '26th', '28th', '30th'],
        datasets: [{
          type: 'line',
          label: 'Sales',
          data: [100, 120, 170, 167, 180, 177, 160],
          backgroundColor: 'transparent',
          borderColor: '#ff5349',
          pointBorderColor: '#ff5349',
          pointBackgroundColor: '#ff5349',
          fill: false
          // pointHoverBackgroundColor: '#007bff',
          // pointHoverBorderColor    : '#007bff'
        },
        {
          type: 'line',
          label: 'Profit',
          data: [60, 80, 70, 67, 80, 77, 100],
          backgroundColor: 'tansparent',
          borderColor: '#024213',
          pointBorderColor: '#068c19',
          pointBackgroundColor: '#068c19',
          fill: false
          // pointHoverBackgroundColor: '#ced4da',
          // pointHoverBorderColor    : '#ced4da'
        }]
      },
      options: {
        aspectRatio: 3,
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            grid: { display: false }
          }
        }
      },
    })

    this.pie_chart = new Chart('pieCanvas', {
      type: 'doughnut',
      data: {
        labels: ['Current', 'At Risk', 'Track',],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
            '#50B848',
            '#C12B0B',
            '#C1A00B'
          ],
          borderColor: [
            '#50B848',
            '#C12B0B',
            '#C1A00B'
          ],
          borderWidth: 1
        }]
      },
      options: {
        spacing: 5,
        aspectRatio: 3,
        responsive: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.label}: ${tooltipItem.raw}`;
              }
            }
          }
        }
      }
    })

    this.scatter_chart = new Chart('scatterCanvas', {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'Gen Z',
            data: [
              { x: 3, y: 37, r:7 },
              { x: 4, y: 16 },
              { x: 9, y: 6 },
              { x: 40, y: 45 },
              { x: 1, y: 15, r:11 },
              { x: 1, y: 45 },
              { x: 21, y: 45 },
              { x: 23, y: 139 },
              { x: 6, y: 31 },
              { x: 56, y: 16 },
              { x: 30, y: 42 },
              { x: 17, y: 14, r:15 },
              { x: 3, y: 69 },
              { x: 10, y: 12 },
              { x: 15, y: 16 },
              { x: 12, y: 21 },
              { x: 9, y: 134 },
              { x: 14, y: 20 },
              { x: 138, y: 43 },
              { x: 10, y: 15 },
              { x: 21, y: 31 },
              { x: 2, y: 17 },
              { x: 9, y: 120 },
              { x: 20, y: 28 },
              { x: 119, y: 30 },
              { x: 18, y: 43 },
              { x: 9, y: 30 },
              { x: 12, y: 39 },
              { x: 11, y: 4 },
              { x: 12, y: 35 },
              { x: 12, y: 20 },
              { x: 8, y: 38 },
              { x: 6, y: 2 },
              { x: 16, y: 33 },
              { x: 23, y: 16 },
              { x: 15, y: 36 },
              { x: 3, y: 12, r:8 },
              { x: 122, y: 5 },
              { x: 2, y: 5 },
              { x: 3, y: 43, r:12 },
              { x: 17, y: 45 },
              { x: 18, y: 41 },
              { x: 85, y: 8 },
              { x: 1, y: 32 },
              { x: 13, y: 32 },
              { x: 132, y: 12 },
              { x: 20, y: 17 },
              { x: 141, y: 35 },
              { x: 22, y: 22 },
              { x: 3, y: 26 },
              { x: 2, y: 21 },
              { x: 3, y: 32 },
              { x: 17, y: 5 },
              { x: 23, y: 41 },
              { x: 9, y: 1 },
              { x: 15, y: 2 },
              { x: 13, y: 44 },
              { x: -10, y: 0 },
              { x: 0, y: 10 },
              { x: 10, y: 5 },
              { x: 15, y: -5 },
              { x: -5, y: 10 }
            ],
            backgroundColor: '#50B848',
            borderColor: '#50B848',
            borderWidth: 1
          },
          {
            label: 'Millenials',
            data: [
              { x: 5, y: 43 },
              { x: 11, y: 11 },
              { x: 11, y: 41 },
              { x: 22, y: 33 },
              { x: 20, y: 15 },
              { x: 7, y: 34 },
              { x: 12, y: 17 },
              { x: 22, y: 39 },
              { x: 87, y: 33 },
              { x: 21, y: 27 },
              { x: 19, y: 30 },
              { x: 7, y: 20 },
              { x: 2, y: 36 },
              { x: 16, y: 106 },
              { x: 105, y: 1 },
              { x: 19, y: 28 },
              { x: 20, y: 37 },
              { x: 123, y: 11 },
              { x: 7, y: 10 },
              { x: 12, y: 35 },
              { x: 1, y: 193, r:8 },
              { x: 13, y: 39 },
              { x: 7, y: 44 },
              { x: 13, y: 39 },
              { x: 1, y: 38 },
              { x: 14, y: 33, r:9},
              { x: 9, y: 6 },
              { x: 81, y: 34 },
              { x: 19, y: 27 },
              { x: 9, y: 38 },
              { x: 8, y: 95 },
              { x: 8, y: 104 },
              { x: 2, y: 19 },
              { x: 6, y: 36 },
              { x: 123, y: 33 },
              { x: 23, y: 21 },
              { x: 64, y: 31 },
              { x: 22, y: 20 },
              { x: 18, y: 15 },
              { x: 14, y: 33 },
              { x: 6, y: 44 },
              { x: 7, y: 9 },
              { x: 16, y: 7 },
              { x: 16, y: 14 },
              { x: 3, y: 28 },
              { x: 4, y: 170 },
              { x: 16, y: 45 },
              { x: 23, y: 19 },
              { x: 3, y: 26, r:7 },
              { x: -5, y: -5 },
              { x: 5, y: 5 },
              { x: 52, y: -10 },
              { x: -10, y: 10 },
              { x: 10, y: 0 }
            ],
            backgroundColor: '#C10B0B',
            borderColor: '#C10B0B',
            borderWidth: 1
          },
          {
            label: 'Gen X',
            data: [
              { x: 23, y: 137 },
              { x: 4, y: 16 },
              { x: 94, y: 6 },
              { x: 40, y: 145 },
              { x: 1, y: 15 },
              { x: 12, y: 45 },
              { x: 21, y: 145 },
              { x: 23, y: 139 },
              { x: 6, y: 31 },
              { x: 56, y: 186 },
              { x: 30, y: 42 },
              { x: 117, y: 14 },
              { x: 3, y: 169 },
              { x: 10, y: 112 },
              { x: 15, y: 16 },
              { x: 112, y: 21 },
              { x: 22, y: 192, r:9 },
              { x: 31, y: 26 },
              { x: 2, y: 121 },
              { x: 3, y: 32 },
              { x: 171, y: 5 },
              { x: 23, y: 41 },
              {x: 1,y: 123},
              {x: 8,y: 43},
              {x: 12,y: 1},
              {x: 2,y: 18},
              {x: 12,y: 17},
              {x: 1,y: 37},
              {x: 7,y: 4},
              {x: 1,y: 1},
              {x: 2,y: 19},
              {x: 11,y: 16},
              {x: 20,y: 15},
              {x: 12,y: 45},
              {x: 11,y: 45},
              {x: 14,y: 44},
              {x: 10,y: 20},
              {x: 8,y: 11},
              {x: 3,y: 28},
              {x: 2,y: 21},
              {x: 21,y: 8},
              {x: 9,y: 13},
              {x: 9,y: 34},
              {x: 1,y: 23},
              {x: 16,y: 15},
              {x: 11,y: 31},
              {x: 13,y: 23},
              {x: 18,y: 22},
              {x: 18,y: 28},
              {x: 2,y: 19},
              {x: 8,y: 10},
              {x: 18,y: 12},
              {x: 4,y: 11},
              {x: 2,y: 32},
              {x: 10,y: 45},
              {x: 13,y: 1},
              {x: 9,y: 21},
              {x: 23,y: 15},
              {x: 18,y: 31},
              {x: 19,y: 7},
              {x: 19,y: 7},
              {x: 1,y: 23},
              {x: 22,y: 5},
              {x: 18,y: 25},
              {x: 5,y: 7},
              {x: 9,y: 35},
              {x: 9,y: 16},
              {x: 15,y: 44},
              {x: 4,y: 41}
            ],
            backgroundColor: '#2C0BC1',
            borderColor: '#2C0BC1',
            borderWidth: 1
          },
        ]
      },
      options: {
        aspectRatio: 4,
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'A Metric'
            },
            grid: { display: false }
          },
          y: {
            title: {
              display: true,
              text: 'Another Metric'
            },
            ticks: { stepSize: 50, padding: 1 },
            grid: { display: false }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return `(${tooltipItem.raw.x}, ${tooltipItem.raw.y})`;
              }
            }
          }
        }
      }
    })
  }

  ngOnDestroy() { }

  showJourney() {
    // return this.journey
    // alert(`Loaded Journey: ${this.journey}`)
    this.utilService.setCurrentJourney('Things are elephant')
  }

  journeyDisp() {
    return this.count
  }

}
