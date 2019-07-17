export class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getString() {
    return `${this.x},${this.y}`;
  }
}

export const calculateHexPoints = (width: number, center: Point): Point[] => {
  const height: number = width / (Math.sqrt(3) / 2);
  const size: number = height / 2;

  const round = (i: number): number => {
    return Number.parseFloat(i.toFixed(6));
  };

  const corner = (i: number) => {
    const angle = (Math.PI / 180) * (60 * i + 30);
    return new Point(round(center.x + size * Math.cos(angle)), round(center.y + size * Math.sin(angle)));
  };
  const points = [];
  for (let i = 0; i < 6; i++) {
    points.push(corner(i));
  }

  return points;
};
