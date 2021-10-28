import React, { component, useState, useEffect } from 'react';
import ContainerItem from './containerItem';
import containerService from '../../services/containerService';
import { useDispatch } from 'react-redux';
import { setStateMetrics } from '../../redux/action/action.js';
import { useSelector } from 'react-redux';
import { timeSelector } from '../selectors/time.selector';
import Loader from '../loader';

const ContainerList = ({
  conList,
  onCheckboxClickCallback,
  conStatus,
  selectedIds,
}) => {
  const { time } = useSelector(timeSelector);
  const dispatch = useDispatch();
  const getData = async (id, containerState) => {
    let stats = {
      cpu: [],
      memory: [],
    };
    if (containerState === 'running')
      stats = await containerService.getMetrics(
        'http://localhost:3000/api/metrics',
        id,
        time
      );
    dispatch(setStateMetrics(stats));
  };

  if (!conList) return null;

  if (!conList.length) return <Loader />;

  const con = conList.map((container, inx) => {
    const isChecked = !!selectedIds[container.Id];
    return (
      <ContainerItem
        key={inx}
        id={container.Id}
        onCheckboxClickCallback={onCheckboxClickCallback}
        getData={() => getData(container.Id, container.State)}
        container={container}
        conStatus={conStatus}
        isChecked={isChecked}
      />
    );
  });

  return <ul className='container_list'>{con}</ul>;
};

export default ContainerList;
