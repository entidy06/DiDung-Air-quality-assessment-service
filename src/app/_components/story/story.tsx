import { StoryHeading } from "./story-heading";
import { StoryRail } from "./story-rail";
import { AirChapter } from "./air-chapter";
import { WeatherChapter } from "./weather-chapter";
import { TrendChapter } from "./trend-chapter";
import { AlertChapter } from "./alert-chapter";
export function Story() {
  return <>
    <StoryHeading />
    <div className="story wrap">
      <StoryRail />
      <div className="chapters">
        <AirChapter />
        <WeatherChapter />
        <TrendChapter />
        <AlertChapter />
      </div>
    </div>
  </>;
}
