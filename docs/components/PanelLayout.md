# Component: PanelLayout

The primary stage for all KWANUS OS dashboards. It is device-aware and emotionally-adaptive.

## Anatomy
1. **Header**: Navigation, title, and ambient status.
2. **Primary Panel (Main)**: The core content area.
3. **Secondary Panel (Insights)**: Contextual data and interpretations.
4. **Tertiary Panel (Optional)**: High-resolution detail or admin views.

## Emotional-Adaptive Behavior
- **Worst Mode**: Automatically collapses to a single-column `minimal` layout.
- **Thriving Mode**: Expands to support deep-grid `multi-panel` views.
- **Density**: Adjusts horizontal/vertical spacing based on resonance intensity.

## Usage
```tsx
import { PanelLayout } from '@/components/layout/PanelLayout';

<PanelLayout
    header={<MyHeader />}
    primary={<CoreData />}
    secondary={<InsightFeed />}
/>
```
