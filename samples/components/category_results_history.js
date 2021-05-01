import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

const numeral = require('numeral');
const moment = require('moment');

class CategoryResultsHistory extends Component {

    render() {

        let data = {
            labels: [],
            datasets: [{
                label: 'Past Tests',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }]
        };

        // console.log(this.props.data.tests);

        for (let i = 0; i < this.props.data.tests.length; i++) {
            let test = this.props.data.tests[i];

            let percentage = numeral(test.correctAnswers / test.totalQuestions * 100).format("0");

            data.labels.push(moment(test.endTime).format('DD/MM/YYYY HH:mm'));
            data.datasets[0].data.push(percentage);
        }

        return <Line data={data} height={250} options={
            {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            min: 0,
                            max: 100
                        }
                    }]
                }
            }
        }/>
    }
}

export default CategoryResultsHistory;
