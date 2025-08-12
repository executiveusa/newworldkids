import { useSpring } from '@react-spring/web';
import { useState, useEffect } from 'react';

interface AnimationConfig {
  from: any;
  to: any;
  config?: {
    tension?: number;
    friction?: number;
    duration?: number;
  };
}

export const useAnimatedValue = (value: number, config?: AnimationConfig['config']) => {
  const [props, api] = useSpring(() => ({
    from: { value: 0 },
    to: { value },
    config: {
      tension: 170,
      friction: 26,
      ...config,
    },
  }));

  useEffect(() => {
    api.start({ to: { value } });
  }, [value, api]);

  return props;
};

export const useFloatingAnimation = (delay: number = 0) => {
  return useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translateY(-10px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: { tension: 300, friction: 10 },
    delay,
  });
};

export const usePageTransition = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0px)' : 'translateY(20px)' },
    config: { tension: 280, friction: 20 },
  });

  return props;
};

export const usePulseAnimation = (interval: number = 2000) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 200);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return useSpring({
    transform: isPulsing ? 'scale(1.1)' : 'scale(1)',
    config: { tension: 300, friction: 10 },
  });
};
