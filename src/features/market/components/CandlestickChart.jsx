import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, ColorType } from 'lightweight-charts';
import { useMarketStore } from '../marketSlice';

const CandlestickChart = () => {
  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const { candles, candlesLoading } = useMarketStore();

  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#9c9fa8',
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.04)' },
        horzLines: { color: 'rgba(255,255,255,0.04)' },
      },
      width: containerRef.current.clientWidth,
      height: 360,
      timeScale: {
        timeVisible: true,
        borderColor: 'rgba(255,255,255,0.08)',
      },
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.08)',
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#1d9e75',
      downColor: '#e24b4a',
      borderVisible: false,
      wickUpColor: '#1d9e75',
      wickDownColor: '#e24b4a',
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || candles.length === 0) return;

    const formattedData = candles.map((c) => ({
      time: Math.floor(c.openTime / 1000),
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
    }));

    seriesRef.current.setData(formattedData);
    chartRef.current.timeScale().fitContent();
  }, [candles]);

  return (
    <div className="relative">
      <div ref={containerRef} className="w-full" />
      {candlesLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-page/60">
          <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default CandlestickChart;