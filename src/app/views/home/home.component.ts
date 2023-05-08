import { Component, OnInit } from '@angular/core';
import { ICity, IGetVariablesQuery, IVariable, Variable } from 'src/app/modals/weathersytem.modal';
import { WeatherSystemService } from 'src/app/services/weathersystem.service';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Chart } from "chart.js";
Chart.register(annotationPlugin);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hottestCity!: string;
  hottestNumberOfDays!: number;
  moistestCity!: string;
  averageMoisture!: number;
  selectedCity?: ICity;
  cities!: ICity[];
  rangeDates!: Date[];

  temperatureVariables!: Variable[];

  data: any;
  options: any;
  chart!: Chart;

  constructor(private _weatherSystemService: WeatherSystemService) { 
  }

  ngOnInit(): void {
    this.temperatureVariables = [];

    this.cities = [
      { name: 'Singapore' },
      { name: 'Kuala Lumpur' },
      { name: 'Bangalore' },
      { name: 'Colombo' }
    ];

    this._weatherSystemService.getHottestCity().subscribe(data => {
    
      this.hottestCity = data.cityName;      
      this.hottestNumberOfDays = data.numOfDaysOver30C;                   

    });

    this._weatherSystemService.getMoistestCity().subscribe(data => {
    
      this.moistestCity = data.cityName;      
      this.averageMoisture = data.averageHumidity;                              

    });
  }

  renderChart(){
    this.chart = new Chart('myChart', {
      data: {
        labels: this.temperatureVariables.map(x => new Date(x.timeStamp).toLocaleDateString('en-Us')),
        datasets: [{
          type: 'line',
          label: 'Temperature',
          data: this.temperatureVariables.map(x => this.getCelcuisValue(x)),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          type: 'bar',
          label: 'Cold',
          data: [],
          backgroundColor: 'rgba(173, 216, 230, 0.25)'
        },
        {
          type: 'bar',
          label: 'Hot',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.25)'
        }]
      },
      options:{
        scales: {
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          annotation: {
            annotations: {
              box1: {
                // Indicates the type of annotation
                type: 'box',
                xMin: 0,
                xMax: this.temperatureVariables.length-1,
                yMin: 0,
                yMax: 25,
                backgroundColor: 'rgba(173, 216, 230, 0.25)'
              },
              box2: {
                // Indicates the type of annotation
                type: 'box',
                xMin: 0,
                xMax: this.temperatureVariables.length-1,
                yMin: 25,
                yMax: 60,
                backgroundColor: 'rgba(255, 99, 132, 0.25)'
              }
            }
          }
        }
      }
    });
  }


  getCelcuisValue(variable: IVariable){
    if(variable.unit == '°F'){
        //5/9 x (F-32)
        return 5/9 * (+variable.value-32);
    }
    return +variable.value;
}


  onSubmitClick(){

    this.temperatureVariables = [];

    const query: IGetVariablesQuery = {
      cityName: this.selectedCity!.name,
      variableName: 'Temperature',
      startTimeStamp: this.rangeDates[0],
      endTimeStamp: this.rangeDates[1],
    };
    

    this._weatherSystemService.getVariables(query).subscribe((data: Variable[]) => {
      
      if(data){
        //console.log(data);    
        
        data.forEach( (element) => {
          this.temperatureVariables.push(element);
        });
        
        if(this.chart == null){
          this.renderChart();
        }
        else{

          this.chart.data.labels = [];
          this.chart.data.datasets.forEach((dataset) => {
              dataset.data.pop();
          });
          this.chart.update();
          
          this.chart.data.labels = this.temperatureVariables.map(x => new Date(x.timeStamp).toLocaleDateString('en-Us'));
          this.chart.data.datasets[0].data = this.temperatureVariables.map(x => this.getCelcuisValue(x));

          this.chart.update();

          /*
          if(this.chart.options.plugins && this.chart.options.plugins.annotation && this.chart.options.plugins.annotation.annotations){
            this.chart.options.plugins.annotation.annotations.forEach((box: any): void => {
              box.xMax = this.temperatureVariables.length-1;
            });
          }*/
          
          this.chart.options = {
            scales: {
            },
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
              annotation: {
                annotations: {
                  box1: {
                    // Indicates the type of annotation
                    type: 'box',
                    xMin: 0,
                    xMax: this.temperatureVariables.length-1,
                    yMin: 0,
                    yMax: 25,
                    backgroundColor: 'rgba(173, 216, 230, 0.25)'
                  },
                  box2: {
                    // Indicates the type of annotation
                    type: 'box',
                    xMin: 0,
                    xMax: this.temperatureVariables.length-1,
                    yMin: 25,
                    yMax: 60,
                    backgroundColor: 'rgba(255, 99, 132, 0.25)'
                  }
                }
              }
            }
          }

          this.chart.update();
        }
      }               

    });
  }

  
}
