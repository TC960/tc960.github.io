import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { motion, AnimatePresence } from 'framer-motion';

const skillsData = {
  name: 'skills',
  children: [
    {
      name: 'ML',
      color: '#D2691E',
      children: [
        { name: 'Python', stars: 3 },
        { name: 'Random Forests', stars: 3 },
        { name: 'OpenCV', stars: 3 },
        { name: 'Scikit-learn', stars: 3 },
        { name: 'PyTorch', stars: 2 },
        { name: 'TensorFlow', stars: 2 },
        { name: 'MediaPipe', stars: 2 },
      ],
    },
    {
      name: 'Data Science',
      color: '#F09650',
      children: [
        { name: 'Pandas', stars: 3 },
        { name: 'SQL', stars: 3 },
        { name: 'PCA', stars: 2 },
        { name: 'FFT/Signal Processing', stars: 2 },
        { name: 'Spark/Dask', stars: 1 },
        { name: 'Power BI', stars: 1 },
      ],
    },
    {
      name: 'NLP',
      color: '#A8541D',
      children: [
        { name: 'LLMs', stars: 3 },
        { name: 'RAG', stars: 3 },
        { name: 'Knowledge Graphs', stars: 3 },
        { name: 'NER/RE', stars: 3 },
        { name: 'Transformers', stars: 3 },
        { name: 'LangChain', stars: 2 },
      ],
    },
    {
      name: 'Full-Stack',
      color: '#E89560',
      children: [
        { name: 'React', stars: 3 },
        { name: 'JavaScript', stars: 3 },
        { name: 'FastAPI', stars: 3 },
        { name: 'Flask', stars: 3 },
        { name: 'TypeScript', stars: 2 },
        { name: 'Flutter', stars: 1 },
      ],
    },
    {
      name: 'Tools',
      color: '#8B4513',
      children: [
        { name: 'Pinecone', stars: 3 },
        { name: 'Docker', stars: 2 },
        { name: 'Neo4j', stars: 2 },
        { name: 'MongoDB', stars: 2 },
        { name: 'AWS', stars: 2 },
        { name: 'Kubernetes', stars: 2 },
      ],
    },
  ],
};

const categoryColors = {
  'ML': '#D2691E',
  'Data Science': '#F09650',
  'NLP': '#A8541D',
  'Full-Stack': '#E89560',
  'Tools': '#8B4513',
};

const SkillsBubbleChart = () => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, skill: null });
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  const starsToValue = (stars) => {
    switch (stars) {
      case 3: return 100;
      case 2: return 60;
      case 1: return 30;
      default: return 50;
    }
  };

  const starsToLabel = (stars) => {
    return '★'.repeat(stars) + '☆'.repeat(3 - stars);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        const height = Math.min(width * 0.65, 550);
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Add defs for gradients and filters
    const defs = svg.append('defs');

    // Create radial gradients for each color
    const uniqueColors = [...new Set(skillsData.children.map(c => c.color))];
    uniqueColors.forEach(color => {
      const gradient = defs.append('radialGradient')
        .attr('id', `gradient-${color.replace('#', '')}`)
        .attr('cx', '35%')
        .attr('cy', '35%')
        .attr('r', '65%');

      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', d3.color(color).brighter(0.8))
        .attr('stop-opacity', 1);

      gradient.append('stop')
        .attr('offset', '60%')
        .attr('stop-color', color)
        .attr('stop-opacity', 1);

      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', d3.color(color).darker(0.5))
        .attr('stop-opacity', 1);
    });

    // Add glow filter
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    const hierarchyData = {
      ...skillsData,
      children: skillsData.children.map(category => ({
        ...category,
        children: category.children.map(skill => ({
          ...skill,
          value: starsToValue(skill.stars),
          category: category.name,
          categoryColor: category.color,
        })),
      })),
    };

    const root = d3.hierarchy(hierarchyData)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    const pack = d3.pack()
      .size([dimensions.width - 4, dimensions.height - 4])
      .padding(4);

    pack(root);

    const g = svg.append('g')
      .attr('transform', 'translate(2, 2)');

    const leaves = root.leaves();

    const node = g.selectAll('g')
      .data(leaves)
      .join('g')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    // Add floating animation using CSS classes
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      .skill-bubble {
        animation: float 3.5s ease-in-out infinite;
      }
    `;
    if (!document.querySelector('#skill-bubble-animations')) {
      styleSheet.id = 'skill-bubble-animations';
      document.head.appendChild(styleSheet);
    }

    node.append('circle')
      .attr('r', 0)
      .attr('fill', d => `url(#gradient-${d.data.categoryColor.replace('#', '')})`)
      .attr('stroke', d => d.data.categoryColor)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.9)
      .style('cursor', 'pointer')
      .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))')
      .attr('class', 'skill-bubble')
      .style('animation-delay', (d, i) => `${i * 0.15}s`)
      .on('mouseenter', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 4)
          .style('filter', `drop-shadow(0 0 12px ${d.data.categoryColor}) drop-shadow(0 0 20px ${d.data.categoryColor})`);

        const rect = containerRef.current.getBoundingClientRect();
        setTooltip({
          visible: true,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          skill: {
            name: d.data.name,
            stars: d.data.stars,
            category: d.data.category,
            color: d.data.categoryColor,
          },
        });
      })
      .on('mousemove', function(event) {
        const rect = containerRef.current.getBoundingClientRect();
        setTooltip(prev => ({
          ...prev,
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }));
      })
      .on('mouseleave', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('stroke-width', 2)
          .style('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))');

        setTooltip(prev => ({ ...prev, visible: false }));
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 30)
      .ease(d3.easeElasticOut.amplitude(1).period(0.5))
      .attr('r', d => d.r);

    node.filter(d => d.r > 28)
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', 'white')
      .attr('font-size', d => Math.min(d.r / 3, 12))
      .attr('font-weight', '500')
      .attr('font-family', 'Inter, system-ui, sans-serif')
      .attr('pointer-events', 'none')
      .attr('opacity', 0)
      .text(d => {
        const maxLength = Math.floor(d.r / 4);
        return d.data.name.length > maxLength
          ? d.data.name.substring(0, maxLength) + '...'
          : d.data.name;
      })
      .transition()
      .duration(400)
      .delay((d, i) => 600 + i * 30)
      .attr('opacity', 1);

  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full relative">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="overflow-visible"
      />

      <AnimatePresence>
        {tooltip.visible && tooltip.skill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 px-4 py-3 bg-background-primary border border-mono-gray-200 rounded-xl shadow-lg pointer-events-none"
            style={{
              left: Math.min(tooltip.x + 15, dimensions.width - 180),
              top: tooltip.y - 70,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tooltip.skill.color }}
              />
              <span className="text-sm font-medium text-text-primary">
                {tooltip.skill.name}
              </span>
            </div>
            <div className="text-xs text-text-muted mb-2">
              {tooltip.skill.category}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent-orange text-sm tracking-wide">
                {starsToLabel(tooltip.skill.stars)}
              </span>
              <span className="text-xs text-text-muted">
                {tooltip.skill.stars === 3 ? 'Expert' : tooltip.skill.stars === 2 ? 'Proficient' : 'Familiar'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-text-muted">{category}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-3 text-xs text-text-muted">
        <span>★★★ Expert</span>
        <span>★★☆ Proficient</span>
        <span>★☆☆ Familiar</span>
      </div>
    </div>
  );
};

export default SkillsBubbleChart;
