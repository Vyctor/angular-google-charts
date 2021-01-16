import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private dados: any;

  constructor(private dadosService: DadosService) {
    this.dadosService.obterDados().subscribe((response) => {
      this.dados = response;
      this.init();
    });
  }

  ngOnInit(): void {}

  public init(): void {
    if (typeof google !== 'undefined') {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  public exibirGraficos(): void {
    this.exibirPieChart();
    this.exibir3dPieChart();
    this.exibirDonutChart();
    this.exibirBarChart();
    this.exibirLineChart();
  }

  public exibirPieChart(): void {
    const element = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(element);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  public exibir3dPieChart(): void {
    const element = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(element);
    const opcoes = this.obterOpcoes();
    opcoes.is3d = true;
    chart.draw(this.obterDataTable(), opcoes);
  }

  public exibirDonutChart(): void {
    const element = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(element);
    const opcoes = this.obterOpcoes();
    opcoes.pieHole = 0.4;
    chart.draw(this.obterDataTable(), opcoes);
  }

  public exibirBarChart(): void {
    const element = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(element);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  public exibirLineChart(): void {
    const element = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(element);
    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  public obterDataTable(): any {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);

    return data;
  }

  public obterOpcoes(): any {
    return {
      title: 'Quantidade de cadastros no primeiro semestre',
      width: 1000,
      heigth: 1000,
    };
  }
}
