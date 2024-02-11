import {
  KazagumoPlugin as Plugin,
  KazagumoPlayer as OldPlayer,
  KazagumoError,
  Kazagumo,
} from 'kazagumo';
import data from "./data";
import { FilterRoot } from "./type";

export class NewPlayer extends OldPlayer {
  private activeFilters: Set<string>;

  constructor(...args: any[]) {
    super(...args);
    this.activeFilters = new Set();
  }

  public async toggleFilter(type: string) {
    if (this.activeFilters.has(type)) {
      await this.removeFilter(type);
    } else {
      await this.addFilter(type);
    }
  }

  public async addFilter(type: string) {
    const filterData = data[type as keyof FilterRoot];
    if (!filterData) throw new KazagumoError(404, "Filter not found");

    await this.shoukaku.node.rest.updatePlayer({
      guildId: this.guildId,
      playerOptions: {
        filters: {
          ...filterData,
          ...this.getMergedFilters(), // Apply already active filters
        },
      },
    });

    this.activeFilters.add(type);
  }

  public async removeFilter(type: string) {
    if (!this.activeFilters.has(type)) return;

    this.activeFilters.delete(type);

    const remainingFilters = Array.from(this.activeFilters).map(
      (filterType) => data[filterType as keyof FilterRoot]
    );

    await this.shoukaku.node.rest.updatePlayer({
      guildId: this.guildId,
      playerOptions: {
        filters: this.getMergedFilters(),
      },
    });
  }

  private getMergedFilters() {
    return Array.from(this.activeFilters).reduce((mergedFilters, filterType) => {
      const filterData = data[filterType as keyof FilterRoot];
      return { ...mergedFilters, ...filterData };
    }, {});
  }
}

export class KazagumoPlugin extends Plugin {
  private kazagumo: Kazagumo | null;

  constructor() {
    super();
    this.kazagumo = null;
  }

  public load(kazagumo: Kazagumo) {
    this.kazagumo = kazagumo;
    this.kazagumo.KazagumoOptions.extends = {
      player: NewPlayer
    };
  }
}
