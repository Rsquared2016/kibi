//TODO MERGE 5.5.2 imports removed, add again if necessary and put kibi comment

export function getUnhashableStatesProvider(getAppState, globalState, $injector) {
  return function getUnhashableStates() {
    // kibi: added kibiState via injector
    // so it works correctly on statusPage where kibiState is not autoloaded
    const stateProviders = [getAppState(), globalState];
    if ($injector.has('kibiState')) {
      stateProviders.push($injector.get('kibiState'));
    }

    return stateProviders.filter(Boolean);
  };
}
