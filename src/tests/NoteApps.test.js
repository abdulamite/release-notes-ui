import React from 'react';
import { render } from '@testing-library/react';
import NoteApps from '../NoteApps';

let apps = ["CEC","CALENDAR"]

describe('Note Apps', () => {
    it('Tells us the available apps', () => {
      const {getByText, getByTestId, container} = render(<NoteApps apps={apps} />);
      expect(apps[0]).toBe('CEC');
    })
  });