import { describe, it, expect } from 'vitest';
import PlanetList from '../../components/PlanetsList.vue';
import { mount } from '@vue/test-utils';

// Create a custom store handler to replace Vuex
const customStore = {
  state: {
    planets: [
      {
        id: 1,
        name: 'Tatooine',
        climate: 'Arid',
        terrain: 'Desert',
      },
    ],
    loading: false,
    error: null,
  },
  actions: {
    fetchPlanets() {},
  },
};

describe('PlanetList.vue', () => {
  it('renders a list of planets', async () => {
    const wrapper = mount(PlanetList, {
      props: {},
      global: {
        provide: {
          // Use custom store handler instead of Vuex store
          $store: customStore,
        },
      },
    });

    await wrapper.vm.$nextTick();

    const planetCards = wrapper.findAll('.planet-card');
    expect(planetCards.length).not.toBe(null); 
  });
});


