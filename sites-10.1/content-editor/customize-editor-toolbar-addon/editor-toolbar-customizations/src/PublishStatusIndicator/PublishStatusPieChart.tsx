import { memo, useMemo } from 'react';

import { getColorPalette } from '@tridion-sites/extensions';

import type { PublishTargetStatus } from './buildTargetStatuses';

const SIZE = 16;
const CENTER = SIZE / 2;
const RADIUS = CENTER - 0.5;

const polarToCartesian = (angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

    return {
        x: CENTER + RADIUS * Math.cos(angleInRadians),
        y: CENTER + RADIUS * Math.sin(angleInRadians),
    };
};

const describeSlicePath = (startAngle: number, endAngle: number): string => {
    const sweep = endAngle - startAngle;

    if (sweep >= 360) {
        return `M ${CENTER} ${CENTER - RADIUS} A ${RADIUS} ${RADIUS} 0 1 1 ${CENTER - 0.001} ${CENTER - RADIUS} Z`;
    }

    const start = polarToCartesian(startAngle);
    const end = polarToCartesian(endAngle);
    const largeArcFlag = sweep > 180 ? 1 : 0;

    return `M ${CENTER} ${CENTER} L ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
};

export interface PublishStatusPieChartProps {
    targets: ReadonlyArray<Pick<PublishTargetStatus, 'isPublished'>>;
    isEmpty?: boolean;
    isLoading?: boolean;
}

/**
 * Component that renders a pie chart representing the publish status of an item across different targets.
 * Each slice of the pie chart corresponds to a target, with the color indicating whether the item is published to that target or not.
 * The component also handles loading and empty states.
 */
export const PublishStatusPieChart = memo(
    ({ targets, isEmpty = false, isLoading = false }: PublishStatusPieChartProps) => {
        const colors = useMemo(() => getColorPalette(), []);
        const sectionCount = targets.length;
        const sliceAngle = sectionCount > 0 ? 360 / sectionCount : 360;

        const slices = useMemo(
            () =>
                targets.map((target, index) => ({
                    d: describeSlicePath(index * sliceAngle, (index + 1) * sliceAngle),
                    fill: target.isPublished ? colors.brandPrimary : 'transparent',
                })),
            [colors.brandPrimary, sliceAngle, targets],
        );

        const dividers = useMemo(() => {
            if (sectionCount <= 1) {
                return [];
            }

            return Array.from({ length: sectionCount }, (_, index) => {
                const point = polarToCartesian(index * sliceAngle);

                return {
                    key: index,
                    x2: point.x,
                    y2: point.y,
                };
            });
        }, [sectionCount, sliceAngle]);

        if (isLoading) {
            return (
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={RADIUS}
                        fill="transparent"
                        stroke={colors.gray100}
                        strokeWidth={1}
                    />
                </svg>
            );
        }

        if (isEmpty || sectionCount === 0) {
            return (
                <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
                    <circle
                        cx={CENTER}
                        cy={CENTER}
                        r={RADIUS}
                        fill="transparent"
                        stroke={colors.gray80}
                        strokeDasharray="2 2"
                        strokeWidth={1}
                    />
                </svg>
            );
        }

        return (
            <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden>
                {slices.map((slice, index) => (
                    <path key={index} d={slice.d} fill={slice.fill} />
                ))}
                {dividers.map(divider => (
                    <line
                        key={divider.key}
                        x1={CENTER}
                        y1={CENTER}
                        x2={divider.x2}
                        y2={divider.y2}
                        stroke={colors.gray0}
                        strokeWidth={1}
                    />
                ))}
                <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="transparent" stroke={colors.gray100} strokeWidth={1} />
            </svg>
        );
    },
);

PublishStatusPieChart.displayName = 'PublishStatusPieChart';
