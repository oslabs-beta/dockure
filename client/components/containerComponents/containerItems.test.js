import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import ContainerItem from './containerItem';

describe('Container Items', () => {
  const props = {
    id: 1001,
    container: {
      Id: 1001,
      Names: ['0test'],
      State: 'running',
      Created: 1367854155,
    },
    getData: () => {},
    onCheckboxClickCallback: () => {},
    conStatus: true,
    isChecked: false,
  };

  describe('render the component', () => {
    it('should have a button', () => {
      render(<ContainerItem {...props} />);
      const button = screen.getByText(/get data/i);
      expect(button).toBeInTheDocument();
    });
    it('should render the container name only the first word', () => {
      render(<ContainerItem {...props} />);
      const name = screen.getByText('test');
      expect(name).toBeInTheDocument();
    });
    it('should render how long is the container since it is created', () => {
      render(<ContainerItem {...props} />);
      const time = screen.getByText(/ago/i);
      expect(time).toBeInTheDocument();
    });
  });

  describe('assign class name based on the container state', () => {
    it('should have class name is_running', () => {
      render(<ContainerItem {...props} />);
      const state = screen.getByText('running');
      expect(state).toHaveClass('is_running');
    });
    it('should have class name is_existed', () => {
      const props2 = {
        ...props,
        container: {
          ...props.container,
          State: 'exited',
        },
      };
      render(<ContainerItem {...props2} />);
      const state = screen.getByText('exited');
      expect(state).toHaveClass('is_exited');
    });
    it('should have class name is_else', () => {
      const props3 = {
        ...props,
        container: {
          ...props.container,
          State: 'created',
        },
      };
      render(<ContainerItem {...props3} />);
      const state = screen.getByText('created');
      expect(state).toHaveClass('is_else');
    });
  });
});
