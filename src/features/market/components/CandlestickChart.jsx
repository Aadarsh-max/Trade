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
        textColor: '#5c606b',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      },
      grid: {
        vertLines: { color: 'rgba(15,23,42,0.05)' },
        horzLines: { color: 'rgba(15,23,42,0.05)' },
      },
      width: containerRef.current.clientWidth,
      height: 360,
      crosshair: {
        vertLine: {
          color: 'rgba(98,88,207,0.4)',
          labelBackgroundColor: '#6258cf',
        },
        horzLine: {
          color: 'rgba(98,88,207,0.4)',
          labelBackgroundColor: '#6258cf',
        },
      },
      timeScale: {
        timeVisible: true,
        borderColor: 'rgba(15,23,42,0.1)',
      },
      rightPriceScale: {
        borderColor: 'rgba(15,23,42,0.1)',
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#15976c',
      downColor: '#d83a39',
      borderVisible: false,
      wickUpColor: '#15976c',
      wickDownColor: '#d83a39',
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
        <div className="absolute inset-0 flex items-center justify-center bg-surface/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <span className="text-xs font-medium text-textsecondary">Loading chart…</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandlestickChart;