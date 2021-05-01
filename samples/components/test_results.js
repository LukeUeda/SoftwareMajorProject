import React, {Component} from 'react';
import {Chart, Doughnut} from 'react-chartjs-2';

var numeral = require('numeral');

var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw: function() {
        originalDoughnutDraw.apply(this, arguments);

        var chart = this.chart.chart;
        var ctx = chart.ctx;
        var width = chart.width;
        var height = chart.height;

        var fontSize = (height / 100).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = chart.config.data.text,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

        ctx.fillText(text, textX, textY);
    }
});

class TestResults extends Component {

    render() {

        const testEnded = (this.props.data.endTime != null);
        if (!testEnded) {
            return "";
        }

        var percentage = numeral(this.props.data.correctAnswers / this.props.data.totalQuestions);

        let data = {
            labels: [
                'Correct',
                'Incorrect',
            ],
            datasets: [{
                data: [
                    this.props.data.correctAnswers,
                    this.props.data.totalQuestions - this.props.data.correctAnswers,
                ],
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                ]
            }],
            text: percentage.format('0%')
        };

        return <div className="pt-3">
                <div>
                    <Doughnut
                        data={data}
                        height={120}
                        options={{
                            maintainAspectRatio: false,
                            legend: false,
                        }}
                    />
                </div>
            </div>;
    }
}

export default TestResults;
