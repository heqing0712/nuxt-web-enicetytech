import $ from 'jquery'
import { loadScript } from '@/utils/index'
import { StaticConfig } from '@/config/app'
export default async () => {
  if (process.client) {
    window.jQuery = window.$ = $
  }

  await loadScript(StaticConfig.libs.jdMarquee)
  await loadScript(StaticConfig.libs.zoom)
  $('.jqzoom').jqueryzoom({
    xzoom: 350,
    yzoom: 350,
    offset: 10,
    position: 'right',
    preload: 1,
    lens: 1
  })
  $('#spec-list').jdMarquee({
    deriction: 'left',
    width: 350,
    height: 56,
    step: 2,
    speed: 4,
    delay: 10,
    control: true,
    _front: '#spec-right',
    _back: '#spec-left'
  })
  $('#spec-list img')
    .bind('mouseover', function() {
      const src = $(this).attr('src')
      $('#spec-n1 img')
        .eq(0)
        .attr({
          src: src.replace('/n5/', '/n1/'),
          jqimg: src.replace('/n5/', '/n0/')
        })
      $(this).css({
        border: '2px solid #ff6600',
        padding: '1px'
      })
    })
    .bind('mouseout', function() {
      $(this).css({
        border: '1px solid #ccc',
        padding: '2px'
      })
    })
}
