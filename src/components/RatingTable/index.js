// vendor
import React, { Component } from 'react';
import { Column, Table, AutoSizer } from 'react-virtualized';
import classNames from 'classnames/bind';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faArrowUp,
    faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

// own
import Styles from './styles.module.css';
const cx = classNames.bind(Styles);

class RatingTableHandler extends Component {
    _starStyle(position) {
        if (position === 0) {
            return Styles.firstPlace;
        } else if (position < 3) {
            return Styles.topThree;
        } else if (position < 10) {
            return Styles.topTen;
        }
    }

    _rowStyles(rowIndex, selectedIndex, ownIndex) {
        const isHeader = rowIndex === -1;
        const selectedRow = selectedIndex !== -1 && selectedIndex === rowIndex;
        const ownRow = ownIndex !== -1 && ownIndex === rowIndex;

        return isHeader
            ? cx({ header: true })
            : cx({
                selectedRow,
                ownRow,
                row: !selectedRow && !ownRow,
            });
    }

    render() {
        const { setParticipant } = this.props;
        const { rating, id, watchId } = this.props;

        const ownIndex = _.isNil(id) ? -1 : _.findIndex(rating, { id }); // Index of logged in user
        const selectedIndex = _.isNil(watchId)
            ? -1
            : _.findIndex(rating, { id: watchId }); // Index of selected participant

        const minHeight =
            rating && rating.length < 10
                ? Math.max(110, rating.length * 50 + 60)
                : Math.max(500);

        return rating ? (
            <div className={ Styles.rating } style={ { minHeight } }>
                <AutoSizer>
                    { ({ width, height }) => (
                        <Table
                            gridClassName={ Styles.ratingGrid }
                            className={ Styles.ratingTable }
                            headerClassName={ Styles.header }
                            rowClassName={ ({ index }) =>
                                this._rowStyles(index, selectedIndex, ownIndex)
                            }
                            scrollToIndex={ selectedIndex }
                            height={
                                rating.length < 10
                                    ? Math.max(110, rating.length * 50 + 60)
                                    : Math.max(height, 500)
                            }
                            width={ width }
                            headerHeight={ 60 }
                            rowHeight={ 50 }
                            rowCount={ rating.length }
                            rowGetter={ ({ index }) => rating[ index ] }
                            onRowClick={ ({ rowData }) =>
                                setParticipant(rowData)
                            }
                        >
                            <Column
                                label='#'
                                className={ Styles.ratingColumn }
                                dataKey='index'
                                flexGrow={ 0 }
                                flexShrink={ 0 }
                                width={ 40 }
                                cellRenderer={ ({ rowIndex }) =>
                                    rowIndex < 10 ? (
                                        <div className={ Styles.ratingStar }>
                                            <span className='fa-layers fa-fw fa-3x'>
                                                <FontAwesomeIcon
                                                    className={ this._starStyle(
                                                        rowIndex,
                                                    ) }
                                                    icon={ faStar }
                                                />
                                                <span
                                                    className={ `fa-layers-text fa-inverse ${
                                                        Styles.starLabel
                                                    }` }
                                                >
                                                    { rowIndex + 1 }
                                                </span>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className={ Styles.ratingIndex }>
                                            { rowIndex + 1 }
                                        </div>
                                    )
                                }
                            />
                            <Column
                                label='Учасник'
                                className={ Styles.ratingColumn }
                                headerRenderer={ () => (
                                    <div className={ Styles.participantHeader }>
                                        Учасник
                                        { ownIndex !== -1 && (
                                            <FontAwesomeIcon
                                                title='До моєї позиції'
                                                onClick={ () =>
                                                    setParticipant(
                                                        rating[ ownIndex ],
                                                    )
                                                }
                                                className={ Styles.toMyPosition }
                                                icon={ faArrowRight }
                                            />
                                        ) }
                                        { !!rating.length && (
                                            <FontAwesomeIcon
                                                title='Показати лідерів'
                                                onClick={ () =>
                                                    setParticipant(
                                                        _.first(rating),
                                                    )
                                                }
                                                className={ Styles.toTop }
                                                icon={ faArrowUp }
                                            />
                                        ) }
                                    </div>
                                ) }
                                dataKey='name'
                                flexGrow={ 2 }
                                width={ 400 }
                            />
                            <Column
                                label='Бали'
                                className={ Styles.ratingColumn }
                                dataKey='score'
                                flexGrow={ 0 }
                                flexShrink={ 0 }
                                width={ 80 }
                            />
                        </Table>
                    ) }
                </AutoSizer>
            </div>
        ) : (
            <div>
                <div className={ Styles.spinner }>
                    <div className={ Styles.rect1 } />
                    <div className={ Styles.rect2 } />
                    <div className={ Styles.rect3 } />
                    <div className={ Styles.rect4 } />
                    <div className={ Styles.rect5 } />
                </div>
            </div>
        );
    }
}

export const RatingTable = RatingTableHandler;
