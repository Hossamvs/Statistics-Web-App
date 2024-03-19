import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const TSNEVisualization = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid or empty data');
        return;
      }

    const margin = { top: 30, right: 20, bottom: 50, left: 50 };
    const width = 900 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d[1]), d3.max(data, d => d[1])])
      .range([height, 0]);

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d[0]))
      .attr('cy', d => yScale(d[1]))
      .attr('r', 4)
      .style('fill', 'steelblue');

    svg.append('text')
      .attr('x', width / 2) 
      .attr('y', height + margin.bottom - 15)  
      .style('text-anchor', 'middle')
      .text('Dimension 1'); 

    svg.append('text')
      .attr('transform', 'rotate(-90)') 
      .attr('y', 0 - margin.left - 5) // Move inside left margin
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em') 
      .style('text-anchor', 'middle')
      .style('fill', 'black')
      .text('Dimension 2'); 
    
    // Optionally, you can add axes
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .call(yAxis);
  }, [data]);

  return <svg className='mx-auto m-5' ref={svgRef}></svg>;
};

export default TSNEVisualization;
