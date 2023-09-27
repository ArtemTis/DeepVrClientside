import React, { useEffect, useState } from 'react'
import { LoadWrapper } from '../../../../../lib/ui/LoadWrapper'
import { Row } from 'antd'
import { InstanceCard } from '../../../../../lib/ui/InstanceCard'
import { ReqStatus } from '../../../../../lib/utils/enums'
import { RootState, useAppDispatch, useAppSelector } from '../../../../../app/store'
import { IInstance } from '../../../../../lib/utils/types'

const FilialSelect = () => {

    const dispatch = useAppDispatch();

    // const selectedInstance = useAppSelector((state: RootState) => state.allGames.instance);
    const isLoading = useAppSelector((state: RootState) => state.allGames.requestStatus === ReqStatus.pending);
    // const beforeSelectedGame = useAppSelector(selectInstance);
    const beforeSelectedGame = undefined;
    const [selected, setSelected] = useState<IInstance | undefined>(
        // beforeSelectedGame
        );

    useEffect(() => {
        // dispatch(getInstances())
    }, [])

    const selectedInstance = [
        {
            id: 1,
            title: 'Все филиалы',
            logo: '',
            city: ''
        },
        {
            id: 2,
            title: 'Ул. Мясницкая',
            logo: '',
            city: ''
        },
        {
            id: 3,
            title: 'Ул. Кутякова',
            logo: '',
            city: ''
        },
        {
            id: 4,
            title: 'Ул. Чапаева',
            logo: '',
            city: ''
        },
    ];

    const onCardClick = (instance: IInstance) => {
        setSelected(instance);
    };

    useEffect(() => {
        // dispatch(setInstance(selected));
      }, [selected])

    return (
        <LoadWrapper isLoading={isLoading}>
            <Row justify="center" gutter={[20, 20]}>
                {selectedInstance &&
                    selectedInstance.map((instance) => (
                        <InstanceCard
                            instance={instance}
                            isSelected={selected?.id === instance.id}
                            onClick={onCardClick}
                            key={instance.id}
                        />
                    ))}
            </Row>
        </LoadWrapper>
    )
}

export default FilialSelect