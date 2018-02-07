'use strict'

import {areaOptions} from 'store/AREA_DATA'

export class Area {
  getOptions(area_id) {
    this.options = [];
    areaOptions.forEach(pr_item => {
      if (pr_item.value === area_id) {
        this.options = [pr_item];
        return;
      } else if (area_id.substring(0, 3) === pr_item.value.substring(0, 3)) {
        pr_item.children.forEach(city_item => {
          if (city_item.value === area_id) {
            this.options = [{value: pr_item.value, label: pr_item.label, children: [city_item]}];
            return;
          } else if (area_id.substring(3, 4) === city_item.value.substring(3, 4)) {
            city_item.children.forEach(dist_item => {
              if (dist_item.value == area_id) {
                this.options = [{value: pr_item.value, label: pr_item.label, children: [{value: city_item.value, label: city_item.label, children: [{dist_item}]}]}];
                return;
              } else {
                return false;
              }
            });
          }
        });
      }
    }
    );
  }
}
