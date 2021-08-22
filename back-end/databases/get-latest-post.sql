select * from posts p
inner join ( select pt.postsId, group_concat(t.name) as tags
             from posts_tags_tag pt
             inner join tag t on pt.tagId = t.id
             group by pt.postsId ) A On A.postsId = p.id
order by p.id desc
limit 0, 10;